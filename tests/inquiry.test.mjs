import assert from "node:assert/strict";
import test from "node:test";
import { buildInquiryMessage, formatPhone, phoneDigits, validateInquiry, investmentRange } from "../src/lib/inquiry.ts";
import { contact, getWhatsAppUrl } from "../src/config/contact.ts";

const values = { name: "João D’Ávila & Ana", breed: "SRD, poodle e sem raça definida", pets: "5 ou mais", people: "0", phone: "+55 (11) 90000-0000", city: "São Paulo", state: "SP" };

test("todos os campos obrigatórios; pets não pode ser zero", () => {
  assert.equal(Object.keys(validateInquiry({name:"",breed:"",pets:"",people:"",phone:"",city:"",state:""})).length, 7);
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
test("mensagem guarda tema, intenção e contagens, sem valores; URL usa somente o número central", () => {
  for (const theme of ["Olá! Gostaria do ensaio Memórias Natalinas 2026.", "Olá! Gostaria de um ensaio de fotografia pet."]) {
    const message=buildInquiryMessage(values,theme,"Agendar um ensaio");
    assert.ok(message.startsWith(theme));
    assert.ok(message.includes("Nome: João D’Ávila & Ana"));
    assert.ok(message.includes("Total de pets: 5 ou mais"));
    assert.ok(message.includes("Total de pessoas: 0 (ensaio somente com pets)"));
    assert.ok(!message.includes(investmentRange));
    assert.ok(!message.includes("R$"));
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
test("localização obrigatória aceita acentos e valida UF sem inferir pelo DDD", () => {
  assert.ok(validateInquiry({...values,city:"  "}).city);
  assert.ok(validateInquiry({...values,city:"12"}).city);
  assert.ok(validateInquiry({...values,state:"XX"}).state);
  assert.deepEqual(validateInquiry({...values,city:"  Santa Bárbara d’Oeste  ",state:"AC"}), {});
  assert.ok(buildInquiryMessage({...values,city:"  Santa Bárbara d’Oeste  "},"Tema","Agendar um ensaio").includes("Localização: Santa Bárbara d’Oeste — SP"));
  assert.throws(()=>buildInquiryMessage({...values,state:""},"Tema","Contato"));
});
