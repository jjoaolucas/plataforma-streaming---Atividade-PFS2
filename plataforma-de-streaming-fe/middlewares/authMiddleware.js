import jwt from 'jsonwebtoken';
import UsuarioModel from '../models/usuModel.js';

const SEGREDO = "Q1w2e3r4@F4d3s2a1";

export default class AuthMiddleware{

    gerarToken(id, nome, email){
        return jwt.sign({
            id: id,
            nome: nome,
            email: email,
            
        }, SEGREDO)

    }

    async validar(req,res,next){
        const authHeader = req.headers.authorization;

        if(authHeader){
            const parts = authHeader.trim().split(' '); 
            const token = parts[1]
            if (token){
                try{
                    let objUsuario =  jwt.verify(token, SEGREDO);
                    let usuario = new UsuarioModel();
                    usuario = await usuario.obter(objUsuario.id);
                    if(usuario){
                        next();
                    }
                    else{
                        res.status(404).json({msg: "Usuário não encontrado !"})
                    }
                }
                catch(ex){
                    res.status(401).json({msg: "Não autorizado !"});
                }
            }
        }
        else                    
            res.status(401).json({msg: "Não autorizado !"});
    }
}
