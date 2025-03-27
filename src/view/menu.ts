import PromptSync, { Prompt } from "prompt-sync";
import { CidadeService } from "../service/cidadesService"
import { DevsService } from "../service/devsService"
import { UserService } from "../service/usersService"
import { CidadeMenu } from "./CidadesView";
import { MenuDevs } from "./devsView";
import { MenuUsers } from "./usersView";
import { Database } from "../repository/Database";
import { Pool } from "pg"
import { exit } from "process";

export class Menu {

    private pool: Pool
    private cidade: CidadeMenu
    private dev: MenuDevs
    private user: MenuUsers
    private prompt: Prompt

    constructor() {
        this.pool = Database.iniciarConexao()
        this.cidade = new CidadeMenu()
        this.dev = new MenuDevs()
        this.user = new MenuUsers()
        this.prompt = PromptSync()
    }

    public async verificacaoDeAcesso() {
        console.log('')
        console.log('Seja bem-vindo ao nosso sistema SeeCities, de consulta e inserção de cidades!')
        console.log(' ')
        console.log('1 - USER')
        console.log('2 - ADM')
        console.log('3 - SAIR')

        let validation = parseInt(this.prompt('Você é ADM ou USER? (Responda com o número da opção): '))

        if (validation === 1) {
            this.menuUSER()
        } else if (validation === 2) {
            let login_adm = this.prompt('Insira seu login de ADM: ')
            let password_adm = this.prompt('Insira sua senha de ADM: ')

            let acesso = await this.buscarLogin_Senha(login_adm, password_adm)

            if (acesso) {
                this.menuADM()
            } else {
                console.log('Login ou Senha incorretos, acesso negado!')
                this.verificacaoDeAcesso()
            }
        } else if (validation === 3) {
            console.log('Saindo...')
            exit
        } else {
            console.log('Você não selecionou uma opção válida!')
            this.verificacaoDeAcesso()
        }
    }
    public async buscarLogin_Senha(login_devs: string, password_devs: string): Promise<boolean> {
        try {
            let query = `SELECT * FROM "PI"."Devs" WHERE login_devs = $1 AND password_devs = $2`;
            let result = await this.pool.query(query, [login_devs, password_devs]);
            return result.rows.length > 0;
        } catch (error) {
            console.error("Erro ao buscar credenciais:", error);
            return false;
        }
    }

    public async menuADM() {
        let ask1 = -1;
        while (ask1 !== 0) {
            console.log('Aqui estão as nossas opções:')
            console.log('1- CIDADES')
            console.log('2- DESENVOLVEDORES')
            console.log('3- USUÁRIOS')
            console.log('0- Sair do sistema')
            console.log(' ')

            ask1 = parseInt(this.prompt('Qual opção deseja? '))

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
                    console.log('Desconectando...')
                    break
                default:
                    console.log("Você não selecionou nenhum item válido...")
                    break
            }
        }
    }

    public async menuUSER() {
        let ask1 = -1;
        while (ask1 !== 0) {
            console.log('Aqui estão as nossas opções:')
            console.log('1- CIDADES')
            console.log('0- Sair do sistema')
            console.log(' ')

            ask1 = parseInt(this.prompt('Qual opção deseja? '))

            switch (ask1) {
                case 1:
                    await this.cidade.cidadeMenu()
                    break
                case 0:
                    console.log('Desconectando...')
                    break
                default:
                    console.log("Você não selecionou nenhum item válido...")
                    break
            }
        }
    }
}