import express from 'express';
import CategoriaController from '../controllers/categoriaController.js'
import AuthMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

let ctrl = new CategoriaController();
let auth = new AuthMiddleware();

//**************Categorias**************//

//consultar categorias
router.get("/", auth.validar, (req,res) => {

    // #swagger.tags = ['Categorias']
    // #swagger.summary = "Endpoint para consultar as categorias"
    /* #swagger.security = [{
        "bearerAuth": []
    }]*/
    ctrl.consultarCategorias(req, res);
});

export default router;
