import Database from '../db/database.js';
import CategoriaModel from '../models/categoriaModel.js';
import BaseModel from './baseModel.js';

const banco = new Database();

export default class ConteudoModel extends BaseModel{

    #con_id;
    #con_youtubeid;
    #titulo;
    #disponivel;
    #categoria;

    get con_id() {return this.#con_id;}
    set con_id(value) {this.#con_id = value;}
    
    get con_youtubeid() {return this.#con_youtubeid;}
    set con_youtubeid(value) {this.#con_youtubeid = value;}

    get titulo() {return this.#titulo;}
    set titulo(value) {this.#titulo = value;}

    get disponivel() {return this.#disponivel;}
    set disponivel(value) {this.#disponivel = value;}

    get categoria() {return this.#categoria;}
    set categoria(value) {this.#categoria = value;}

    constructor(con_id,con_youtubeid, titulo,disponivel, categoria){
        super();
        this.#con_id= con_id;
        this.#con_youtubeid = con_youtubeid;
        this.#titulo = titulo;
        this.#disponivel = disponivel;
        this.#categoria = categoria;
    }

    async listar(){
        let sql = "select * from tb_conteudo con inner join tb_categoria cat on con.cat_id = cat.cat_id";
        let rows = await banco.ExecutaComando(sql);
        return this.toMap(rows);
    }

    async cadastrar(){
        let sql = "insert into tb_conteudo (con_youtubeid, con_titulo, con_disponivel, cat_id) values (?,?,?,?)";
        let valores = [this.#con_youtubeid, this.#titulo, this.#disponivel, this.#categoria.id];
        let result = await banco.ExecutaComandoNonQuery(sql,valores);
        return result;
    }

    async atualizar(){
        let sql = "update tb_conteudo set con_youtubeid = ?, con_titulo = ?, con_disponivel = ? , cat_id = ? where con_id =?";
        let valores = [this.#con_youtubeid,this.#titulo, this.#disponivel, this.#categoria.id, this.#con_id];
        let result = await banco.ExecutaComandoNonQuery(sql,valores);
        return result;
    }

    async deletar(id){
        let sql = "delete from tb_conteudo where con_id = ?";
        let valores = [id];
        let result = await banco.ExecutaComandoNonQuery(sql,valores);
        return result;
    }

    async obter(id){
        let sql = "select * from tb_conteudo con inner join tb_categoria cat on con.cat_id = cat.cat_id where con_id = ?";
        let valores = [id];
        let rows = await banco.ExecutaComando(sql,valores);
        return this.toMap(rows,false);
    }

    async consultarCategorias() {
        let sql = "select * from tb_categoria"; 
        let rows = await banco.ExecutaComando(sql);
        return rows.map(row => {
            let categoria = new CategoriaModel();
            categoria.id = row["cat_id"]; 
            categoria.descricao = row["cat_descricao"]; 
            return categoria;
        });
    }

    toMap(rows, isList = true) {
        let lista = [];
    
        for (let row of rows) {
            let obj = new ConteudoModel();
            obj.#con_id = row["con_id"];
            obj.#con_youtubeid = row["con_youtubeid"];
            obj.#titulo = row["con_titulo"];
            obj.#disponivel = row["con_disponivel"];
            obj.#categoria = new CategoriaModel();
            obj.#categoria.id = row["cat_id"];
            obj.#categoria.descricao = row["cat_descricao"]; 
    
            lista.push(obj);
        }
    
        if (isList) {
            return lista;
        }
    
        return lista[0];
    }
    
}