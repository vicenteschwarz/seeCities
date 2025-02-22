import PromptSync, { Prompt } from "prompt-sync";
import { Database } from "../repository/Database";
import { DevsService } from "../service/devsService";
import { Email } from "../util/email";


export class MenuDevs{
    private dev : DevsService
    private prompt: Prompt

    constructor(){
        this.dev = new DevsService()
        this.prompt = PromptSync()
    }

    public async devMenu() {
        console.log(' ')
        console.log('Seja bem vindo ao nosso banco de devs!')

        /*
        console.log("Faça seu cadastro a seguir:")
        let name = this.prompt("Digite seu primeiro nome: ")
        console.log(this.prompt("Digite Email: "))
        console.log(this.prompt("Digite sua Senha: : "))
        console.log("")
        console.log("Sucesso! Aproveite nossas funcionalidades", name.charAt(0).toUpperCase() + name.slice(1) + "!")
        console.log(' ')
        */



        console.log(' ')
        console.log('aqui estão as nossas opções:')
        console.log('1- listar devs')
        console.log('2- inserir devs')
        console.log('3- pesquisar codigo do dev no banco')
        console.log('4- buscar infos de um dev')
        console.log('5- deletar dev')
        console.log('6- atualizar infos de um dev')
        console.log('0- sair do sistema')
        console.log('100- testar a conexão com o banco de dados')
        console.log(' ')
        let ask1 = 0

        ask1 = parseInt(this.prompt('qual opção desejas? '))
        switch (ask1) {

            case 1:
                console.table(await this.dev.listarDevs())
                return this.devMenu()
                break

            case 2:
                const name = this.prompt('Qual o primeiro nome do desenvolvedor que desejas incluir? ')
                const full_name = this.prompt('Qual o nome completo de desenvolvedor? ')
                const login = this.prompt('Qual o login desse desenvolvdor? ')
                const password = parseInt(this.prompt('Digite uma senha de 4 dígitos para esse novo dev: '))
                const email = this.prompt('Digite o email para o dev: ')
                await this.dev.inserirDev(name, full_name, login, password, email )
                return this.devMenu()
                break

            case 3:
                let p1 = await this.prompt('Informe o login do dev por favor: ')
                console.log(await this.dev.exibirID(p1))
                return this.devMenu()
                break

            case 4:
                let p2 = await this.prompt('Informe o login do dev por favor: ')
                let caçarID = await this.dev.exibirID(p2)
                console.table(await this.dev.buscarPorID(caçarID[0]))
                return this.devMenu()

            case 5:
                let p3 = await this.prompt('Informe o login do dev por favor: ')
                let caçarID2 = await this.dev.exibirID(p3)
                await this.dev.deletarDev(caçarID2[0])
                console.log(`Dev deletado!`) //adicionar uma função dentro do code para retornar o nome do dev que foi deletado juntamente com a mensagem
                console.table(await this.dev.listarDevs())
                return this.devMenu()

            case 6:
                let p4 = await this.prompt('Informe o login do dev por favor: ')
                let caçarID3 = await this.dev.exibirID(p4)
                console.table(await this.dev.buscarPorID(caçarID3[0]))
                let colunas = await this.prompt('Qual das colunas listadas desejas atualizar? ')
                let registro = await this.prompt('Para o que desejas atualizar? ')
                await this.dev.attInfosDev(caçarID3[0], colunas, registro)
                console.log('Informações atualizadas!')
                return this.devMenu()

            case 0:
                break;
            case 100:
                await Database.iniciarConexao()
                console.log('Conexão estabelecida corretamente!')
                return this.devMenu()
                break
            default:
                await console.log("Voce nao selecionou nenhum item...")
                return this.devMenu()

        }   //final do switch
    }   //final do metodo
}   //classe

