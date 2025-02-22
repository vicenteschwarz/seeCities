import { Pool } from "pg"
import { Database } from "./Database"
import { Cidade } from "../entity/Cidades"
let prompt = require('prompt-sync')()

export class CidadeRepository {

    private pool: Pool

    constructor() {
        this.pool = Database.iniciarConexao()
    }

    async listarCidades(): Promise<Cidade[]> {
        const query = `SELECT cod_cdc, city, state, country, climate, culture, tourist_att FROM "PI"."CDC" order by cod_cdc`
        const result = await this.pool.query(query)

        const listaCidades: Cidade[] = []

        for (const row of result.rows) {
            const cidade = new Cidade(row.cod_cdc, row.city, row.state, row.country, row.climate, row.culture, row.tourist_att)
            listaCidades.push(cidade)
        }
        return listaCidades
        //console.table(result.rows) 
    }

    async exibirID(city: string): Promise<number[]> {
        const query = 'SELECT cod_cdc from "PI"."CDC" where city ilike $1'
        const id = await this.pool.query(query, [city])

        const lista: number[] = []
        for (const row of id.rows) {
            lista.push(row.cod_cdc)
        }
        return lista
    }

    async buscarPorID(cod_cdc: number): Promise<Cidade[]> {
        let query = 'SELECT * from "PI"."CDC" where cod_cdc = $1'
        const id = await this.pool.query(query, [cod_cdc])

        const lista: Cidade[] = []
        for (const row of id.rows) {
            const cdc = new Cidade(row.cod_cdc, row.city, row.state, row.country, row.climate, row.culture, row.tourist_att)
            lista.push(cdc)
        }
        return lista
    }

    async inserirCidade(city: string, state: string, country: string, climate: string, culture: string, tourist_att: string) {
        let query = 'INSERT INTO "PI"."CDC" (city, state, country, climate, culture, tourist_att) VALUES ($1, $2, $3, $4, $5, $6)'
        await this.pool.query(query, [city, state, country, climate, culture, tourist_att])


    }

    async deletarCidade(cod_cdc: number): Promise<Cidade[]> {
        let query = 'delete from "PI"."CDC" where cod_cdc = $1'
        const deletada = await this.pool.query(query, [cod_cdc])
        return deletada
    }

    async attInfosCidade(cod_cdc: number, coluna:string, registro:string):Promise<void>{
        let query = `update "PI"."CDC" set ${coluna} = $1 where cod_cdc = $2`
        let result = await this.pool.query(query,[registro, cod_cdc])
    }
}

