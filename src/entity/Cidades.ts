const prompt = require('prompt-sync')()

export class Cidade{
    private city: string
    private state: string
    private country: string
    private climate: string
    private culture: string
    private tourist_att: string
    private cod_cdc: number
    

    constructor( cod_cdc: number, city: string, state: string, country: string, climate: string, culture: string, tourist_att: string){
        this.cod_cdc = cod_cdc
        this.city = city
        this.state = state
        this.country = country
        this.climate = climate
        this.culture = culture
        this.tourist_att = tourist_att
    }
}
/*
    public exibirInfos(){
        return `CIDADE 1: ${this.city}, ${this.state}, ${this.country}, ${this.climate}, ${this.culture}, ${this.tourist_att}, ${this.cod_cdc}`
    }

    public inserirCidade():string{
        return `a`
    }

    public exibirCidades():string{
        return `a`
    }

    public exibirID():number{
        return 1
    }

    public deletarCidade():string{
        return `a`
    }

    public alterarClima():string{
        return `a`
    }

*/
