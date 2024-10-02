import express from 'express';
import AutenticacaoController from '../controllers/authController.js'

const router = express.Router();

let ctrl = new AutenticacaoController();
router.post("/token", (req, res) => {
    // #swagger.tags = ['Autenticacao']
    // #swagger.summary = "Endpoint para validar acesso"
  
    ctrl.token(req, res)
});

export default router