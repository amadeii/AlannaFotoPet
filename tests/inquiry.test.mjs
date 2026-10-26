import assert from "node:assert/strict";
import test from "node:test";
import { buildInquiryMessage, formatPhone, phoneDigits, validateInquiry, petCounts, peopleCounts, investmentOptions, parseLocation } from "../src/lib/inquiry.ts";
import { contact, getWhatsAppUrl } from "../src/config/contact.ts";

const values = { name: "João D’Ávila & Ana", breed: "SRD, poodle e sem raça definida", pets: "7", people: "0", phone: "+55 (11) 90000-0000", location: "São Paulo - SP", investment: investmentOptions[0], confirmed: true };

test("todos os campos obrigatórios; pets não pode ser zero", () => {
  assert.equal(Object.keys(validateInquiry({name:"",breed:"",pets:"",people:"",phone:"",location:"",investment:"",confirmed:false})).length, 8);
  assert.ok(validateInquiry({...values,pets:"0"}).pets);
  assert.ok(validateInquiry({...values,people:"-1"}).people);
  assert.ok(validateInquiry({...values,pets:"1.5"}).pets);
  assert.ok(validateInquiry({...values,name:"1"}).name);
});
test("aceita um pet, múltiplos pets, SRD, zero pessoas e caracteres especiais", () => {
  assert.deepEqual(validateInquiry(values), {});
  assert.deepEqual(validateInquiry({...values,pets:"1",people:"5 ou mais",breed:"SRD"}), {});
  assert.deepEqual(validateInquiry({...values,breed:"sem raça definida"}), {});
});
test("telefone: DDD, celular, fixo, colagem internacional e comprimentos inválidos", () => {
  assert.equal(formatPhone("+55 (11) 90000-0000"), "(11) 90000-0000");
  assert.equal(formatPhone("1433334444"), "(14) 3333-4444");
  assert.equal(phoneDigits("+55 (55) 90000-0000"), "55900000000");
  assert.deepEqual(validateInquiry({...values,phone:"1433334444"}), {});
  for (const phone of ["", "900000000", "00900000000", "20900000000", "11800000000", "11333344445566"]) {
    assert.ok(validateInquiry({...values,phone}).phone, phone);
  }
});
test("mensagem guarda tema, intenção, contagens e preferência de investimento; URL usa somente o número central", () => {
  for (const theme of ["Olá! Gostaria do ensaio Memórias Natalinas 2026.", "Olá! Gostaria de um ensaio de fotografia pet."]) {
    const message=buildInquiryMessage(values,theme,"Agendar um ensaio");
    assert.ok(message.startsWith(theme));
    assert.ok(message.includes("Nome: João D’Ávila & Ana"));
    assert.ok(message.includes("Total de pets: 7"));
    assert.ok(message.includes("Total de pessoas: 0 (ensaio somente com pets)"));
    assert.ok(!message.includes("Faixa de valores dos ensaios: R$ 650 a R$ 1.260"));
    assert.ok(message.includes(`Investimento desejado: ${values.investment}`));
    assert.ok(message.includes("Confirmo que as informações acima são verdadeiras."));
    assert.ok(message.includes("Interesse: Agendar um ensaio"));
    assert.ok(message.includes("Localização: São Paulo — SP"));
    assert.doesNotMatch(message, /hero|rodapé|seção de contato/i);
    const url=new URL(getWhatsAppUrl(message));
    assert.equal(url.pathname, `/${contact.whatsappNumber}`);
    assert.equal(url.searchParams.get("text"), message);
  }
});
test("dados inválidos nunca produzem mensagem final", () => {
  assert.throws(()=>buildInquiryMessage({...values,phone:"123"},"Tema","Contato"));
});
test("cidade e UF no mesmo campo, sem inferir estado pelo DDD", () => {
  for (const location of ["", "12 - SP", "Bauru", "Bauru - XX", "SP", "Bauru - São Paulo"]) {
    assert.ok(validateInquiry({...values,location}).location, location);
  }
  for (const location of ["São Paulo - SP", "São Paulo/SP", "São Paulo, SP", "São Paulo SP", "  São Paulo - sp  "]) {
    assert.deepEqual(parseLocation(location), {city:"São Paulo",state:"SP"});
  }
  assert.deepEqual(validateInquiry({...values,location:"Santa Bárbara d’Oeste - AC"}), {});
  assert.ok(buildInquiryMessage({...values,location:"  Santa Bárbara d’Oeste - ac  "},"Tema","Agendar").includes("Localização: Santa Bárbara d’Oeste — AC"));
});
test("investimento e confirmação são obrigatórios, sem seleção automática", () => {
  for (const investment of investmentOptions) {
    assert.deepEqual(validateInquiry({...values, investment}), {});
    assert.ok(buildInquiryMessage({...values,investment},"Tema","Agendar").includes(investment));
  }
  assert.ok(validateInquiry({...values,investment:""}).investment);
  assert.ok(validateInquiry({...values,investment:"outro valor"}).investment);
  assert.ok(validateInquiry({...values,confirmed:false}).confirmed);
  assert.throws(()=>buildInquiryMessage({...values,confirmed:false},"Tema","Agendar"));
  assert.throws(()=>buildInquiryMessage({...values,investment:""},"Tema","Agendar"));
});
test("número de pets aceita inteiros positivos e rejeita números inválidos", () => {
  assert.deepEqual(petCounts, ["1", "2", "3", "4", "5 ou mais"]);
  assert.deepEqual(peopleCounts, ["0", "1", "2", "3", "4", "5 ou mais"]);
  for (const pets of ["1", "5", "12"]) assert.deepEqual(validateInquiry({...values,pets}), {});
  for (const pets of ["0", "-1", "1.5", "abc", "1e2", "5 ou mais", "9007199254740992"]) assert.ok(validateInquiry({...values,pets}).pets, pets);
});
