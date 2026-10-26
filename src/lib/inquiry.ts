export interface InquiryValues {
  name: string;
  breed: string;
  pets: string;
  people: string;
  phone: string;
  location: string;
  investment: string;
  confirmed: boolean;
}

export const petCounts = ["1", "2", "3", "4", "5 ou mais"];
export const peopleCounts = ["1", "2", "3", "4", "5 ou mais"];
export const investmentOptions = [
  "Entre R$650 e R$850",
  "Entre R$850 e R$1.200",
  "Indiferente, dependendo da entrega",
];
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

export function parseLocation(value: string) {
  const match = cleanText(value).match(/^(.+?)\s*(?:[-–—,/]\s*|\s+)([a-z]{2})$/iu);
  if (!match) return null;
  const city = cleanText(match[1]);
  const state = match[2].toUpperCase();
  if (city.length < 2 || city.length > 100 || (city.match(/\p{L}/gu)?.length ?? 0) < 2 || !states.includes(state)) return null;
  return { city, state };
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
  if (!parseLocation(values.location))
    errors.location = "Informe sua cidade e a sigla do estado. Ex.: São Paulo - SP.";
  if (!breed || breed.length > 180 || !/\p{L}/u.test(breed))
    errors.breed =
      "Informe a raça ou escreva SRD / sem raça definida. Pode listar várias raças.";
  if (!/^[1-9]\d*$/u.test(values.pets) || !Number.isSafeInteger(Number(values.pets)))
    errors.pets = "Informe um número inteiro de pets, a partir de 1.";
  if (!peopleCounts.includes(values.people))
    errors.people = "Selecione quantas pessoas participarão, a partir de 1.";
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
  if (!investmentOptions.includes(values.investment))
    errors.investment = "Selecione quanto você pensa em investir nas suas memórias.";
  if (values.confirmed !== true)
    errors.confirmed = "Confirme que as informações são verdadeiras para continuar.";
  return errors;
}

export function buildInquiryMessage(
  values: InquiryValues,
  themeMessage: string,
  intent: string,
) {
  if (Object.keys(validateInquiry(values)).length)
    throw new Error("Preencha os campos obrigatórios corretamente.");
  const location = parseLocation(values.location)!;
  return [
    themeMessage,
    "",
    `Interesse: ${intent}`,
    `Nome: ${cleanText(values.name)}`,
    `Raça(s) do(s) pet(s): ${cleanText(values.breed)}`,
    `Total de pets: ${values.pets}`,
    `Total de pessoas: ${values.people}`,
    `Telefone com DDD: ${formatPhone(values.phone)}`,
    `Localização: ${location.city} — ${location.state}`,
    `Investimento desejado: ${values.investment}`,
    "Confirmo que as informações acima são verdadeiras.",
    "",
    "Gostaria de conversar sobre os detalhes do ensaio.",
  ].join("\n");
}
