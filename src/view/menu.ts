import PromptSync, { Prompt } from "prompt-sync";
import { CidadeService } from "../service/cidadesService"
import { DevsService } from "../service/devsService"
import { UserService } from "../service/usersService"
import { CidadeMenu } from "./CidadesView";
import { MenuDevs } from "./devsView";
import { MenuUsers } from "./usersView";

export class Menu {
    private cidade: CidadeMenu
    private dev: MenuDevs
    private user: MenuUsers
    private prompt: Prompt

    constructor() {
        this.cidade = new CidadeMenu()
        this.dev = new MenuDevs()
        this.user = new MenuUsers()
        this.prompt = PromptSync()
    }

    public async menu() {
        console.log('')
        console.log('Seja bem vindo ao nosso sistema de cadastro, consulta e inserção de cidades!')
        console.log(' ')
        let ask1 = 1000000
        while (ask1 !== 0) {
            console.log('Aqui estão as nossas opções:')
            console.log('1- CIDADES')
            console.log('2- DESENVOLVEDORES')
            console.log('3- USUÁRIOS')
            console.log('0- sair do sistema')
            console.log(' ')
            ask1 = parseInt(this.prompt('qual opção desejas? '))
            switch (ask1) {

                case 1:
                    await this.cidade.cidadeMenu()
                    break
                case 2:
                    await this.dev.devMenu()
                    break
                case 3:
                    await this.user.userMenu()
                    break
                case 0:
                    await console.log('desconectando...')
                    break;
                default:
                    await console.log("Voce nao selecionou nenhum item...")
                    return this.menu()
            }
        }
    }
}