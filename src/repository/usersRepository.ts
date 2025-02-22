import { Pool } from "pg"
import { Database } from "./Database"
import { Users } from "../entity/Users"

export class UsersRepository{

    private pool : Pool

    constructor(){
        this.pool = Database.iniciarConexao()
    }
    
    async listarUsers():Promise<Users[]>{
        const query = `SELECT id_users, users, name_users, login_users, password_users, email_users FROM "PI"."Users" order by id_users`
        const result = await this.pool.query(query)

        const listaUsers: Users[]=[]   

        for(const row of result.rows){
            //console.log(row)
            const users = new Users(row.id_users, row.users, row.name_users, row.login_users, row.password_users, row.email_users)
            listaUsers.push(users)
        }
        return listaUsers
        //console.table(result.rows)    
    }  
    
    async inserirUser(users: string, name_users: string, login_users: string, password_users: number, email_users: string) {
        let query = 'INSERT INTO "PI"."Users" (users, name_users, login_users, password_users, email_users) VALUES ($1, $2, $3, $4, $5)'
        await this.pool.query(query, [users, name_users, login_users, password_users, email_users])
    }

    async exibirID(login_users: string): Promise<number[]> {
        const query = 'SELECT id_users from "PI"."Users" where login_users ilike $1'
        const id = await this.pool.query(query, [login_users])

        const lista: number[] = []
        for (const row of id.rows) {
            lista.push(row.id_users)
        }
        return lista
    }

    async buscarPorID(id_users: number): Promise<Users[]> {
            let query = 'SELECT * from "PI"."Users" where id_users = $1'
            const id = await this.pool.query(query, [id_users])
    
            const lista: Users[] = []
            for (const row of id.rows) {
                const dev = new Users(row.id_users, row.users, row.name_users, row.login_users, row.password_users, row.email_users)
                lista.push(dev)
            }
            return lista
    }

    async deletarUser(id_users: number): Promise<Users[]> {
            let query = 'delete from "PI"."Users" where id_users = $1'
            const deletada = await this.pool.query(query, [id_users])
            return deletada
    }

    async attInfosUser(id_users: number, coluna:string, registro:string):Promise<void>{
        let query = `update "PI"."Users" set ${coluna} = $1 where id_users = $2`
        let result = await this.pool.query(query,[registro, id_users])
    }
}

