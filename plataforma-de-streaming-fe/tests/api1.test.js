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

describe("GET /conteudos ", () => {
    test("Deve retornar Ok", async () => {
      const response = (await apiTest.get("/conteudos"));
      expect(response.statusCode).toBe(200);
    });
});

describe("POST /conteudos ", () => {
    test("Deve retornar Ok", async () => {
      const response = await apiTest.post("/conteudos").send({aaaa: "aaaa", bbb: "bbbb"});
      expect(response.statusCode).toBe(400);
    });
});

describe("PUT /conteudos ", () => {
    test("Deve retornar Ok", async () => {
      const response = await apiTest.put("/conteudos").send({aaaa: "aaaa", bbb: "bbbb"});
      expect(response.statusCode).toBe(400);
    });
});


describe("GET /conteudos/:id ", () => {
    test("Deve retornar Ok", async () => {
      const response = (await apiTest.get("/conteudos/GDlkCkcIqTs"));
      expect(response.statusCode).toBe(200);
    });
});

describe("DELETE /conteudos/:id ", () => {
    test("Deve retornar Ok", async () => {
      const response = (await apiTest.delete("/conteudos/GDlkCkcIqTs"));
      expect(response.statusCode).toBe(200);
    });
});

describe("DELETE /conteudos/:id ", () => {
    test("Deve retornar Ok", async () => {
      const response = (await apiTest.delete("/conteudos/GDlkCkcIqTs"));
      expect(response.statusCode).toBe(404);
    });
});
