
import { Cidade } from "../entity/Cidades"
import { CidadeRepository } from "../repository/CidadesRepository"

export class CidadeService{
    private rep : CidadeRepository

    constructor(){
        this.rep = new CidadeRepository()  
    }

    public async listarCidades():Promise<Cidade[]>{
        return await this.rep.listarCidades()
    }

    public async exibirID(city:string):Promise<number[]>{
        return await this.rep.exibirID(city)
    }

    public async buscarPorID(cod_cdc: number):Promise<Cidade[]>{
        let lista :Cidade[]=[]
        lista = await this.rep.buscarPorID(cod_cdc)

        if(lista.length==0){
        console.log( `Id nao cadastrado no banco!`)
        }

        return lista
    }

    public async inserirCidade(city:string, state:string, country:string, climate:string, culture:string, tourist_att:string){
        await this.rep.inserirCidade(city, state, country, climate, culture, tourist_att)
    }

    public async deletarCidade(cod_cdc:number){
        await this.rep.deletarCidade(cod_cdc)
    }

    public async attInfosCidade(cod_cdc: number, coluna:string, registro:string){
        await this.rep.attInfosCidade(cod_cdc, coluna, registro)
    }
}
