import express from'express';
import ConteudoController from '../controllers/conteudoController.js';
import AuthMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

let ctrl = new ConteudoController();
let auth = new AuthMiddleware();

//**************Conteúdos**************//

//listarConteudos

router.get("/", auth.validar, (req,res) => {

    // #swagger.tags = ['Conteudos']
    // #swagger.summary = "Endpoint para consultar as conteudos"
    /* #swagger.security = [{
        "bearerAuth": []
    }]*/
    ctrl.listarConteudos(req, res);
});

//cadastrar
router.post("/", auth.validar, (req,res) => {

    // #swagger.tags = ['Conteudos']
    // #swagger.summary = "Endpoint para cadastrar os conteudos"
    /* #swagger.security = [{
        "bearerAuth": []
    }]*/
    /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/conteudoModel"
                    }  
                }
            }
        } 
    */
    ctrl.cadastrarConteudo(req, res);

});

//alterar
router.put("/", auth.validar, (req,res) => {

    // #swagger.tags = ['Conteudos']
    // #swagger.summary = "Endpoint para alterar os conteudos"
    /* #swagger.security = [{
        "bearerAuth": []
    }]*/
   /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/conteudoModel"
                    }  
                }
            }
        } 
    */
    ctrl.alterarConteudo(req, res);

});

//deletar
router.delete("/:id", auth.validar, (req,res) => {

    // #swagger.tags = ['Conteudos']
    // #swagger.summary = "Endpoint para deletar conteudos"
    /* #swagger.security = [{
        "bearerAuth": []
    }]*/
    ctrl.deletarConteudo(req, res);

});

//obter
router.get("/:id", auth.validar, (req,res) => {

    //#swagger.tags = ['Conteudos']
    //#swagger.summary = "Endpoint para obter um conteudo especifico"
    /*#swagger.security = [{
        "bearerAuth": []
    }]*/
    ctrl.obterConteudo(req, res);

});

// //assistir
router.get("/assistir/:id", auth.validar, (req,res) => {

    // #swagger.tags = ['Assistir um Conteudo Especifico']  
    // #swagger.summary = "Endpoint para assistir um conteudo Especifico"
    /* #swagger.security = [{
        "bearerAuth": []
    }]*/
    ctrl.assistirConteudo(req, res);    

});

// //capa
router.get("/capa/:id", auth.validar, (req,res) => {

    // #swagger.tags = ['Capa do Conteudo Especifico']  
    // #swagger.summary = "Endpoint para obter a capa de um conteudo Especifico"
    /* #swagger.security = [{
        "bearerAuth": []
    }]*/
    ctrl.capaConteudo(req, res);    
});

export default router;
