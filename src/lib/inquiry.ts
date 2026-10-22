export interface InquiryValues {
  name: string;
  breed: string;
  pets: string;
  people: string;
  phone: string;
  city: string;
  state: string;
}

export const investmentRange =
  "Faixa de valores dos ensaios: R$ 650 a R$ 1.260";
export const petCounts = ["1", "2", "3", "4", "5 ou mais"];
export const peopleCounts = ["0", ...petCounts];
export const states = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO",
  "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI",
  "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO",
];
const validDDDs = new Set(
  "11 12 13 14 15 16 17 18 19 21 22 24 27 28 31 32 33 34 35 37 38 41 42 43 44 45 46 47 48 49 51 53 54 55 61 62 63 64 65 66 67 68 69 71 73 74 75 77 79 81 82 83 84 85 86 87 88 89 91 92 93 94 95 96 97 98 99".split(
    " ",
  ),
);

export function cleanText(value: string) {
  return value.replace(/\s+/gu, " ").trim();
}

export function phoneDigits(value: string) {
  const digits = value.replace(/\D/g, "");
  return /^55\d{10,11}$/.test(digits) ? digits.slice(2) : digits;
}

export function formatPhone(value: string) {
  const digits = phoneDigits(value);
  if (digits.length > 11) return digits;
  if (digits.length < 3) return digits.length ? `(${digits}` : "";
  const local = digits.slice(2);
  const split = local.length > 8 ? 5 : 4;
  return `(${digits.slice(0, 2)}) ${local.slice(0, split)}${local.length > split ? `-${local.slice(split)}` : ""}`;
}

export function validateInquiry(values: InquiryValues) {
  const errors: Partial<Record<keyof InquiryValues, string>> = {};
  const name = cleanText(values.name);
  if (
    name.length < 2 ||
    name.length > 100 ||
    (name.match(/\p{L}/gu)?.length ?? 0) < 2
  )
    errors.name = "Informe seu nome, com pelo menos duas letras.";
  const breed = cleanText(values.breed);
  const city = cleanText(values.city);
  if (city.length < 2 || city.length > 100 || (city.match(/\p{L}/gu)?.length ?? 0) < 2)
    errors.city = "Informe sua cidade.";
  if (!states.includes(values.state))
    errors.state = "Selecione seu estado.";
  if (!breed || breed.length > 180 || !/\p{L}/u.test(breed))
    errors.breed =
      "Informe a raça ou escreva SRD / sem raça definida. Pode listar várias raças.";
  if (!petCounts.includes(values.pets))
    errors.pets = "Selecione quantos pets participarão.";
  if (!peopleCounts.includes(values.people))
    errors.people = "Selecione quantas pessoas participarão. Pode ser zero.";
  const digits = phoneDigits(values.phone);
  if (
    !validDDDs.has(digits.slice(0, 2)) ||
    !(
      /^[0-9]{2}[2-5][0-9]{7}$/.test(digits) ||
      /^[0-9]{2}9[0-9]{8}$/.test(digits)
    )
  )
    errors.phone =
      "Informe um telefone brasileiro válido com DDD, com 10 ou 11 dígitos.";
  return errors;
}

export function buildInquiryMessage(
  values: InquiryValues,
  themeMessage: string,
  intent: string,
) {
  if (Object.keys(validateInquiry(values)).length)
    throw new Error("Preencha os campos obrigatórios corretamente.");
  return [
    themeMessage,
    "",
    `Interesse: ${intent}`,
    `Nome: ${cleanText(values.name)}`,
    `Raça(s) do(s) pet(s): ${cleanText(values.breed)}`,
    `Total de pets: ${values.pets}`,
    `Total de pessoas: ${values.people}${values.people === "0" ? " (ensaio somente com pets)" : ""}`,
    `Telefone com DDD: ${formatPhone(values.phone)}`,
    `Localização: ${cleanText(values.city)} — ${values.state}`,
    "",
    "Gostaria de conversar sobre os detalhes do ensaio.",
  ].join("\n");
}
