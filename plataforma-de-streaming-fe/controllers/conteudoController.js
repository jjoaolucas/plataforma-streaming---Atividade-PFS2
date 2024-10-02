import ConteudoModel from '../models/conteudoModel.js';

export default class ConteudoController{

    //**************Conteúdos**************//

    //listarConteudos
    async listarConteudos(req,res){
        try{
            let conteudos = new ConteudoModel();
            let lista = await conteudos.listar();
            if(lista && lista.length > 0){
                res.status(200).json(lista);
            }
            else{
                res.status(404).json({msg: "Nenhum conteúdo encontrado" });
            }
        }
        catch(ex){
            res.status(500).json({msg: ex.message});
        }
    }

    //cadastrar
    async cadastrarConteudo(req,res){

        try{
            let { con_youtubeid, titulo, disponivel, categoria } = req.body;
            if (con_youtubeid&& titulo && disponivel && categoria.id > 0) {
            let conteudos = new ConteudoModel(0, con_youtubeid,titulo, disponivel, categoria);
            let result = await conteudos.cadastrar();
                if(result){
                    res.status(200).json({msg: "Conteúdo cadastrado com sucesso"});
                }
                else{
                    throw new Error("Erro ao cadastrar conteúdo");
                }
            }
            else{
                res.status(400).json({msg:"Parâmetros inválidos"});
            }
        }
        catch(ex){
            res.status(500).json({msg: ex.message})
        }
    }

    //alterar
    async alterarConteudo(req,res){
        try{
            let {con_id,con_youtubeid,titulo,disponivel, categoria} = req.body;
            if(con_id && con_youtubeid&& titulo && disponivel && categoria.id){
                let conteudos = new ConteudoModel();
                if(await conteudos.obter(con_id)){

                    conteudos.con_id = con_id;
                    conteudos.con_youtubeid = con_youtubeid;
                    conteudos.titulo = titulo;
                    conteudos.disponivel = disponivel;
                    conteudos.categoria = categoria;
                    
                    let result = await conteudos.atualizar();

                    if(result){
                        res.status(200).json({msg:"Alteração de conteúdo concluida com sucesso"});
                    }
                    else{
                        throw new Error("Erro ao alterar conteúdo");
                    }
                }
                else{
                    res.status(404).json({msg:"Nenhum conteúdo encontrado para alteração"});
                }
            }
            else{
                res.status(400).json({msg: "Parâmetros inválidos"});
            }
        }
        catch(ex){
            res.status(500).json({msg:ex.message});
        }
    }

    //deletar
    async deletarConteudo(req,res){
        try{
            let {id} = req.params;
            let conteudos = new ConteudoModel();
            let result = await conteudos.deletar(id);
            if(result){
                res.status(200).json({msg: "Conteúdo Deletado com Sucesso"});
            }
            else{
                throw new Error("Erro ao deletar conteúdo");
            }
        }
        catch(ex){
            res.status(500).json({msg: ex.message});
        }
    }

    //obter
    async obterConteudo(req,res){
        try{
            let {id} = req.params;
            let conteudos = new ConteudoModel();
            conteudos= await conteudos.obter(id);
            if(conteudos){
                res.status(200).json(conteudos);
            }
            else{
                res.status(404).json({msg:"Conteúdo não encontrado"});
            }
        }
        catch(ex){
            res.status(500).json({msg: ex.message});
        }
    }

    //assistir
    async assistirConteudo(req,res){
        try{
            let {id} = req.params;
            let conteudos = new ConteudoModel();
            let result = await conteudos.obter(id);
            if(result){
                res.setHeader('Content-Type', 'text/html')
                res.send(`<iframe width="560" height="315" allow='autoplay' src="https://www.youtube.com/embed/${result.con_youtubeid}?autoplay=1"</iframe>`)
            }
            else{
                res.status(404).json({msg:"Conteúdo não encontrado"});
            }
        }
        catch(ex){
            res.status(500).json({msg: ex.message});
        }
    }
    

     //capa
     async capaConteudo(req,res){
        try{
            let {id} = req.params;
            let conteudos = new ConteudoModel();
            let result = await conteudos.obter(id);
            if(result){
                res.setHeader('Content-Type', 'text/html')
                res.send(`<img src="https://i.ytimg.com/vi/${result.con_youtubeid}/hqdefault.jpg"/>`)
            }
            else{
                res.status(404).json({msg:"Conteúdo não encontrado"});
            }
        }
        catch(ex){
            res.status(500).json({msg: ex.message});
        }
    }



    
}