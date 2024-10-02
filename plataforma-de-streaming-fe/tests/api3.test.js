import app from '../server'
import request from 'supertest'


let token = '';
let apiTest;

//gerando token
beforeAll(async () => {
  
  const response = await request(app).post('/token').send({ email: "fulvio@unoeste.br", senha: "12345"});
  token = response.body.chave;
  apiTest = request.agent(app).set({"authorization": "Bearer " + token})
});

describe("GET /categorias ", () => {
    test("Deve retornar Ok", async () => {
      const response = (await apiTest.get("/categorias"));
      expect(response.statusCode).toBe(200);
    });
});


describe("GET /conteudos/assistir/:id-conteudo", () => {
    test("Deve retornar Ok", async () => {
      const response = (await apiTest.get("/conteudos/asistir/99999"));
      expect(response.statusCode).toBe(404);
    });
});

describe("GET /conteudos/capa/:id-conteudo", () => {
    test("Deve retornar Ok", async () => {
      const response = (await apiTest.delete("/conteudos/capa/99999"));
      expect(response.statusCode).toBe(404);
    });
});