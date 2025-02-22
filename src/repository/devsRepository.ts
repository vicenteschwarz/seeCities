import { Pool } from "pg"
import { Database } from "./Database"
import { Devs } from "../entity/Devs"

export class DevsRepository {

    private pool: Pool

    constructor() {
        this.pool = Database.iniciarConexao()
    }

    async listarDevs(): Promise<Devs[]> {
        const query = `SELECT id_devs, devs, name_devs, login_devs, password_devs, email_devs FROM "PI"."Devs" order by id_devs`
        const result = await this.pool.query(query)

        const listaDevs: Devs[] = []


        for (const row of result.rows) {
            //console.log(row)
            const devs = new Devs(row.id_devs, row.devs, row.name_devs, row.login_devs, row.password_devs, row.email_devs)
            listaDevs.push(devs)
        }
        return listaDevs
        //console.table(result.rows)    
    }

    async inserirDev(devs: string, name_devs: string, login_devs: string, password_devs: number, email_devs: string) {
        let query = 'INSERT INTO "PI"."Devs" (devs, name_devs, login_devs, password_devs, email_devs) VALUES ($1, $2, $3, $4, $5)'
        await this.pool.query(query, [devs, name_devs, login_devs, password_devs, email_devs])
    }

    async exibirID(login_devs: string): Promise<number[]> {
        const query = 'SELECT id_devs from "PI"."Devs" where login_devs ilike $1'
        const id = await this.pool.query(query, [login_devs])

        const lista: number[] = []
        for (const row of id.rows) {
            lista.push(row.id_devs)
        }
        return lista
    }

    async buscarPorID(id_devs: number): Promise<Devs[]> {
        let query = 'SELECT * from "PI"."Devs" where id_devs = $1'
        const id = await this.pool.query(query, [id_devs])

        const lista: Devs[] = []
        for (const row of id.rows) {
            const dev = new Devs(row.id_devs, row.devs, row.name_devs, row.login_devs, row.password_devs, row.email_devs)
            lista.push(dev)
        }
        return lista
    }

    async deletarDev(id_devs: number): Promise<Devs[]> {
        let query = 'delete from "PI"."Devs" where id_devs = $1'
        const deletada = await this.pool.query(query, [id_devs])
        return deletada
    }

    async attInfosDev(id_devs: number, coluna:string, registro:string):Promise<void>{
        let query = `update "PI"."Devs" set ${coluna} = $1 where id_devs = $2`
        let result = await this.pool.query(query,[registro, id_devs])
    }   
}

