import Database from '../db/database.js';
import BaseModel from './baseModel.js';

const banco = new Database();

export default class CategoriaModel extends BaseModel{

    #cat_id;
    #descricao;
    
    get cat_id() {return this.#cat_id;}
    set cat_id(value) {this.#cat_id = value;}

    get descricao() {return this.#descricao;}
    set descricao(value) {this.#descricao = value;}

    constructor(cat_id, descricao){

        super();
        this.#cat_id = cat_id;
        this.#descricao = descricao;
    }

    async listar(){
        let sql = "select * from tb_categoria";
        let rows = await banco.ExecutaComando(sql);
        return this.toMap(rows);
    }

    async cadastrar(){
        let sql = "insert into tb_categoria (cat_descricao) values (?)";
        let valores = [this.#descricao];
        let result = await banco.ExecutaComandoNonQuery(sql,valores);
        return result;
    }

    async atualizar(){
        let sql = "update tb_categoria set cat_descricao = ? where cat_id = ?";
        let valores = [this.#descricao, this.#cat_id];
        let result = await banco.ExecutaComandoNonQuery(sql,valores);
        return result;
    }

    async deletar(id){
        let sql = "delete from tb_categoria where cat_id = ?";
        let valores = [id];
        let result = await banco.ExecutaComandoNonQuery(sql,valores);
        return result;
    }

    async obter(id){
        let sql = "select * from tb_categoria where cat_id = ?";
        let valores = [id];
        let rows = await banco.ExecutaComando(sql,valores);
        return this.toMap(rows,false);
    }

    toMap(rows, isList = true){
        let lista = [];

        for(let row of rows){
            let obj = new CategoriaModel();
            obj.#cat_id= row["cat_id"];
            obj.#descricao = row["cat_descricao"];

            lista.push(obj);
        }

        if(isList)
            return lista;
        
        return lista[0];
    }
}