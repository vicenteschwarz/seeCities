import { Users } from "../entity/Users"
import { UsersRepository } from "../repository/usersRepository"
import { Email } from "../util/email"

export class UserService {
    private rep: UsersRepository

    constructor() {
        this.rep = new UsersRepository()
    }
    async listarUsers(): Promise<Users[]> {
        return await this.rep.listarUsers()
    }

    public async inserirUser(users: string, name_users: string, login_users: string, password_users: number, email_users: string) {
        //let email_verify :Devs[]=[]
        //email_verify = await this.rep.inserirDev(devs, name_devs, login_devs, password_devs, email)
        //let teste = Email.verificarEmail(email)

        if (Email.verificarEmail(email_users) == false) {
            console.log(`User nao cadastrado no banco! Email Inválido!`)
            return null
        }
        let email_verify = await this.rep.inserirUser(users, name_users, login_users, password_users, email_users)
        return ` Dev inserido com sucesso! ${email_verify}`

    }

    public async exibirID(login_users: string): Promise<number[]> {
        return await this.rep.exibirID(login_users)
    }

    public async buscarPorID(id_users: number): Promise<Users[]> {
            let lista: Users[] = []
            lista = await this.rep.buscarPorID(id_users)
    
            if (lista.length == 0) {
                console.log(`Id nao cadastrado no banco!`)
            }
    
            return lista
    }

    public async deletarUser(id_users: number) {
        await this.rep.deletarUser(id_users)
    }

    public async attInfosUser(id_users: number, coluna:string, registro:string){
        await this.rep.attInfosUser(id_users, coluna, registro)
    }
}