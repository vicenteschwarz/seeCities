import { Criptografia } from "../util/criptografia"

const prompt = require('prompt-sync')()

export class Devs{
    private id_devs: number
    private devs: string
    private name_devs: string
    private login_devs: string
    private password_devs: number
    private email : string

    constructor(id_devs:number, devs:string, name_devs:string, login_devs:string, password_devs:number, email:string){
        this.id_devs = id_devs
        this.devs = devs
        this.name_devs = name_devs
        this.login_devs = login_devs
        this.password_devs = password_devs
        this.email = email
    }
    /*
    public exibirInfos(texto){
        return `DEV ${this.id_devs}:  ${this.devs}, ${this.name_devs}, ${this.login_devs }, ${this.password_devs,Criptografia.criptografar(texto)}`
    }
    */
}
