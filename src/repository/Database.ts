import {Pool} from "pg"
 
export class Database{
    static pool: Pool
    static iniciarConexao():Pool{
        this.pool = new Pool({
            user: 'postgres',       // Substitua pelo seu usuário
            host: 'localhost',         // Host do PostgreSQL
            database: 'Projeto Integrador',   // Nome do banco de dados
            password: '1234',     // Substitua pela sua senha
            port: 5432
        })
        return this.pool
    }
}