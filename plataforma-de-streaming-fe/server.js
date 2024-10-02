import express from 'express'
import { createRequire } from "module";
import swaggerUi from 'swagger-ui-express';
import cookieParser from 'cookie-parser';

const require = createRequire(import.meta.url);
const outputJson = require("./swagger-output.json");

import categoriasRoutes from './routes/categoriaRoute.js';
import conteudoRoutes from './routes/conteudoRoute.js';
import autenticacaoRoutes from './routes/authRoute.js';


const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/conteudos', conteudoRoutes);
app.use('/categorias', categoriasRoutes);

app.use('/auth', autenticacaoRoutes);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(outputJson));

app.listen(5000, function() {
    console.log("Backend do grupo DAD - em execução");
})

export default app;