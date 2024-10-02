import app from '../server'
import request from 'supertest'


let token = '';
let apiTest;

  //não autorizados!
describe("GET /conteudos ", () => {
    test("Deve retornar Não Autorizado", async () => {
      const response = (await request(app).get("/conteudos"));
      expect(response.statusCode).toBe(401);
    });
});

describe("POST /conteudos ", () => {
    test("Deve retornar Não Autorizado", async () => {
      const response = (await request(app).post("/conteudos"));
      expect(response.statusCode).toBe(401);
    });
});

describe("PUT /conteudos ", () => {
    test("Deve retornar Não Autorizado", async () => {
      const response = (await request(app).put("/conteudos"));
      expect(response.statusCode).toBe(401);
    });
});

describe("DELETE /conteudos/:id-exclusao", () => {
    test("Deve retornar Não Autorizado", async () => {
      const response = (await request(app).delete("/conteudos/1"));
      expect(response.statusCode).toBe(401);
    });
});

describe("DELETE /conteudos/:id-exclusao", () => {
  test("Deve retornar Não Autorizado", async () => {
    const response = (await request(app).delete("/conteudos/1"));
    expect(response.statusCode).toBe(401);
  });
});

describe("GET /conteudos/:id-conteudo", () => {
    test("Deve retornar Ok", async () => {
      const response = (await request(app).get("/conteudos/1"));
      expect(response.statusCode).toBe(200);
    });
});
