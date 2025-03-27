import { Users } from "../entity/Users"
import { UsersRepository } from "../repository/usersRepository"
import { Email } from "../util/email"

export class UserService {
    private rep: UsersRepository
    id_users: number;
    users: string;
    name_users: string;
    login_users: string;
    password_users: number;
    email_users: string;
    

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
        if (!users) {
            console.log('Nome Inválido!')
            return null
        }
        if (!name_users) {
            console.log('Nome completo nao inserido!')
            return null
        }
        if (!login_users) {
            console.log('Login não inserida!')
            return null
        }
        if (password_users.toString().length !== 4) {
            console.log('A senha inserida precisa ser numérica, e possuir 4 digitos.')
            return null
        }
        if (Email.verificarEmail(email_users) == false) {
            console.log(`User nao cadastrado no banco! Email Inválido!`)
            return null
        }
        let email_verify = await this.rep.inserirUser(users, name_users, login_users, password_users, email_users)
        return `User inserido com sucesso!`

    }

    public async exibirID(login_users: string): Promise<number[]> {
        let result = await this.rep.exibirID(login_users)
        if(result.length === 0){
            throw new Error(`Login não cadastrado!`)
            this.exibirID(login_users)
        }
        else return result
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