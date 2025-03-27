import { Criptografia } from "../util/criptografia"

const prompt = require('prompt-sync')()

export class Users{
    private id_users: number
    private users: string
    private name_users: string
    private login_users: string
    private password_users: string
    private email_users:string

    constructor(id_users:number, users:string, name_users:string, login_users:string, password_users:string, email_users:string){
        this.id_users = id_users
        this.users = users
        this.name_users = name_users
        this.login_users = login_users
        this.password_users = password_users
        this.email_users = email_users
    }

    /*
    public exibirInfos(texto){
        return `USER ${this.id_user}:, ${this.user}, ${this.name_user}, ${this.login_user }, ${this.password_user,Criptografia.criptografar(texto)}`
    }
    */
}
