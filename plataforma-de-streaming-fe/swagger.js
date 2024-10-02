import swaggerAutogen from "swagger-autogen";
import CategoriaModel from "./models/categoriaModel.js";
import ConteudoModel from "./models/conteudoModel.js";
import UsuarioModel from "./models/usuModel.js";

const doc = {
    info: {
        title: "API RESTful - Plataforma de Streaming",
        description: 'API criada para a atividade 3 por Andressa Farias, Dayane Tiziani e Deivid Lucas Muller Maia '
    },
    host: 'localhost:5000',
    components: {
        schemas: {
            categoriaModel: new CategoriaModel (2,"filme").toJSON(),
            conteudoModel: new ConteudoModel(1,"youtube.com", "video", true, new CategoriaModel (2,"filme")).toJSON(),
            usuarioModel: new UsuarioModel (1, "testando@yahoo.com.br", 1, "Fulano").toJSON(),
        },
        
        securitySchemes:{
            bearerAuth: {
                type: 'http',
                scheme: 'bearer'
            }
        }
    }
}

const outputJson = "./swagger-output.json";
const routes = ['./server.js']

// const routes = ['./routes/conteudosRoutes.js', './routes/categoriaRoute.js'];

swaggerAutogen({openapi: '3.0.0'})(outputJson, routes, doc)

.then( async () => {
    await import('./server.js');
})