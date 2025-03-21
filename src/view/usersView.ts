
import PromptSync, { Prompt } from "prompt-sync";
import { Database } from "../repository/Database";
import { UserService } from "../service/usersService";

export class MenuUsers {
    private user: UserService
    private prompt: Prompt

    constructor() {
        this.user = new UserService()
        this.prompt = PromptSync()
    }

    public async userMenu() {
        console.log(' ')
        console.log('Seja bem vindo ao nosso banco de users!')

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
        console.log('1- listar users')
        console.log('2- inserir users')
        console.log('3- pesquisar codigo do user no banco')
        console.log('4- buscar infos de um user')
        console.log('5- deletar user')
        console.log('6- atualizar infos de um user')
        console.log('0- sair de "USERS"')
        console.log('100- testar a conexão com o banco de dados')
        console.log(' ')
        let ask1 = 0

        ask1 = parseInt(this.prompt('qual opção desejas? '))
        switch (ask1) {

            case 1:
                console.table(await this.user.listarUsers())
                return this.userMenu()
                break

            case 2:
                const name = this.prompt('Qual o primeiro nome do usuário que desejas incluir? ')
                const full_name = this.prompt('Qual o nome completo de usuário? ')
                const login = this.prompt('Qual o login desse user? ')
                const password = parseInt(this.prompt('Digite uma senha de 4 dígitos para esse novo user: '))
                const email = this.prompt('Digite o email para o user: ')
                await this.user.inserirUser(name, full_name, login, password, email)
                return this.userMenu()
                break

            case 3:
                let p1 = await this.prompt('Informe o login do user por favor: ')

                //sem o try e catch, o code quebra ao exibir a mensagem do service(validação)

                try {
                    console.log(await this.user.exibirID(p1))
                }
                catch (e) { console.log('Erro no sistema', e.message) }
                return this.userMenu()
                break

            case 4:
                let p2 = await this.prompt('Informe o login do user por favor: ')
                let caçarID = await this.user.exibirID(p2)
                console.table(await this.user.buscarPorID(caçarID[0]))
                return this.userMenu()

            case 5:
                let p3 = await this.prompt('Informe o login do user por favor: ')
                let caçarID2 = await this.user.exibirID(p3)
                await this.user.deletarUser(caçarID2[0])
                console.log(`User deletado!`) //adicionar uma função dentro do code para retornar o nome do dev que foi deletado juntamente com a mensagem
                console.table(await this.user.listarUsers())
                return this.userMenu()

            case 6:
                let p4 = await this.prompt('Informe o login do user por favor: ')
                let caçarID3 = await this.user.exibirID(p4)
                console.table(await this.user.buscarPorID(caçarID3[0]))
                let colunas = await this.prompt('Qual das colunas listadas desejas atualizar? ')
                let registro = await this.prompt('Para o que desejas atualizar? ')
                await this.user.attInfosUser(caçarID3[0], colunas, registro)
                console.log('Informações atualizadas!')
                return this.userMenu()

            case 0:
                break;
            case 100:
                await Database.iniciarConexao()
                console.log('Conexão estabelecida corretamente!')
                return this.userMenu()
                break
            default:
                await console.log("Voce nao selecionou nenhum item...")
                return this.userMenu()

        }   //final do switch
    }   //final do metodo
}   //classe
