import { Devs } from "../entity/Devs"
import { IDevs } from "../interfaces/Idevs"
import { DevsRepository } from "../repository/devsRepository"
import { Criptografia } from "../util/criptografia"
import { Email } from "../util/email"


export class DevsService implements IDevs{
    private rep: DevsRepository
    id_devs: number;
    devs: string;
    name_devs: string;
    login_devs: string;
    password_devs: number;
    email: string;

    constructor() {
        this.rep = new DevsRepository()
    }
    async listarDevs(): Promise<Devs[]> {
        return await this.rep.listarDevs()
    }
    public async inserirDev(devs: string, name_devs: string, login_devs: string, password_devs: number, email_devs: string): Promise<string | null> {
        //let email_verify :Devs[]=[]
        //email_verify = await this.rep.inserirDev(devs, name_devs, login_devs, password_devs, email)
        //let teste = Email.verificarEmail(email)
        if (!devs) {
            console.log('Nome Inválido!')
            return null
        }
        if (!name_devs) {
            console.log('Nome completo nao inserido!')
            return null
        }
        if (!login_devs) {
            console.log('Login não inserida!')
            return null
        }
        if (password_devs.toString().length !== 4) {
            console.log('A senha inserida precisa ser numérica, e possuir 4 digitos.')
            return null
        }
        if (Email.verificarEmail(email_devs) == false) {
            console.log(`Dev nao cadastrado no banco! Email Inválido!`)
            return null
        }
        let email_verify = await this.rep.inserirDev(devs, name_devs, login_devs, password_devs, email_devs)
        return ` Dev inserido com sucesso! ${email_verify}`

    }

    public async exibirID(login_devs: string): Promise<number[]> {
        let result = await this.rep.exibirID(login_devs)
        if(result.length === 0){
            throw new Error(`Login não cadastrado!`)
            this.exibirID(login_devs)
        }
        else return result
    }

    public async buscarPorID(id_devs: number): Promise<Devs[]> {
        let lista: Devs[] = []
        lista = await this.rep.buscarPorID(id_devs)

        if (lista.length == 0) {
            console.log(`Id nao cadastrado no banco!`)
        }

        return lista
    }

    public async deletarDev(id_devs: number) {
        await this.rep.deletarDev(id_devs)
    }

    public async attInfosDev(id_devs: number, coluna:string, registro:string){
        await this.rep.attInfosDev(id_devs, coluna, registro)
    }
}
