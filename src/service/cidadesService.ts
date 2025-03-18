
import { Cidade } from "../entity/Cidades"
import { ICidades } from "../interfaces/Icidades"
import { CidadeRepository } from "../repository/CidadesRepository"

export class CidadeService implements ICidades {
    private rep: CidadeRepository
    cod_cdc: number;
    city: string;
    state: string;
    country: string;
    climate: string;
    culture: string;
    tourist_att: string;

    constructor() {
        this.rep = new CidadeRepository()
    }

    public async listarCidades(): Promise<Cidade[]> {
        return await this.rep.listarCidades()
    }

    public async exibirID(city: string): Promise<number[]> {
        let result = await this.rep.exibirID(city)
        if (result.length === 0) {
            throw new Error(`Cidade não cadastrada!`)
            this.exibirID(city)
        }
        else return result
    }

    public async buscarPorID(cod_cdc: number): Promise<Cidade[]> {
        let lista: Cidade[] = []
        lista = await this.rep.buscarPorID(cod_cdc)

        if (lista.length == 0) {
            console.log(`Id nao cadastrado no banco!`)
        }

        return lista
    }

    public async inserirCidade(city: string, state: string, country: string, climate: string, culture: string, tourist_att: string) {
        if (!city) {
            console.log('Nome Inválido!')
            return
        }
        if (!climate) {
            console.log('Clima nao inserido!')
            return
        }
        if (!culture) {
            console.log('Cultura não inserida!')
            return
        }
        if (!tourist_att) {
            console.log('Ponto turístico não inserido!')
            return
        }
        await this.rep.inserirCidade(city, state, country, climate, culture, tourist_att)
    }

    public async deletarCidade(cod_cdc: number) {
        let result = await this.rep.deletarCidade(cod_cdc)
    }

    public async attInfosCidade(cod_cdc: number, coluna: string, registro: string) {
        await this.rep.attInfosCidade(cod_cdc, coluna, registro)
    }
}
