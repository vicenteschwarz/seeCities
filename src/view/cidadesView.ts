import PromptSync, { Prompt } from "prompt-sync";
import { Database } from "../repository/Database";
import { CidadeService } from "../service/cidadesService";
import { Cidade } from "../entity/Cidades";
import { CidadeRepository } from "../repository/CidadesRepository";


export class CidadeMenu {
    private cidade: CidadeService
    private prompt: Prompt


    constructor() {
        this.cidade = new CidadeService()
        this.prompt = PromptSync()
    }

    public async cidadeMenu() {
        console.log(' ')
        console.log('Seja bem vindo ao nosso banco de cidades!')

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
        console.log('1- listar cidades')
        console.log('2- inserir cidades')
        console.log('3- pesquisar codigo da cidade da cidade no banco')
        console.log('4- buscar infos de uma cidade')
        console.log('5- deletar cidade')
        console.log('6- atualizar infos de uma cidade')
        console.log('0- sair de "CIDADES"')
        console.log('100- testar a conexão com o banco de dados')
        console.log(' ')
        let ask1 = 0
        ask1 = parseInt(this.prompt('qual opção desejas? '))
        switch (ask1) {

            case 1:
                console.table(await this.cidade.listarCidades())
                return this.cidadeMenu()
                break

            case 2:
                const city = this.prompt('Qual cidade desejas incluir? ')
                const state = this.prompt('Qual o estado dessa cidade? ')
                const country = this.prompt('Qual o país dessa cidade? ')
                const climate = this.prompt('Qual o clima dessa cidade? ')
                const culture = this.prompt('Qual a cultura dessa cidade? ')
                const tourist = this.prompt('Insira um ponto turístico: ')
                await this.cidade.inserirCidade(city, state, country, climate, culture, tourist)
                console.log('Cidade inserida com sucesso!')
                return this.cidadeMenu()
                break

            case 3:
                let p1 = this.prompt('Informe a cidade por favor: ')

                //sem o try e catch, o code quebra ao exibir a mensagem do service(validação)

                try {
                    console.log(await this.cidade.exibirID(p1))
                }
                catch (e) {
                    console.log('Erro no sistema -', e.message);
                }
                return this.cidadeMenu()
                

            case 4:
                let p2 = this.prompt('Informe a cidade por favor: ')
                let caçarID = await this.cidade.exibirID(p2)
                console.table(await this.cidade.buscarPorID(caçarID[0]))
                return this.cidadeMenu()

            case 5:
                let p3 = this.prompt('Informe a cidade por favor: ')
                try {
                let caçarID2 = await this.cidade.exibirID(p3)
                    await this.cidade.deletarCidade(caçarID2[0])
                    console.log('Cidade deletada!')
                    console.table(await this.cidade.listarCidades())
                }
                catch (e) {
                    console.log('Erro no sistema -', e.message)
                }
                return this.cidadeMenu()

            case 6:
                let p4 = this.prompt('Informe a cidade por favor: ')
                let caçarID3 = await this.cidade.exibirID(p4)
                console.table(await this.cidade.buscarPorID(caçarID3[0]))
                let colunas = this.prompt('O que desejas atualizar? ') //nome da coluna
                let registro = this.prompt('Para o que desejas atualizar? ') //para o que quer alterar o dado
                await this.cidade.attInfosCidade(caçarID3[0], colunas, registro)
                console.log('Informações atualizadas!')
                return this.cidadeMenu()

            case 0:
                break;

            case 100:
                await Database.iniciarConexao()
                console.log('Conexão estabelecida corretamente!')
                return this.cidadeMenu()
                

            default:
                await console.log("Voce nao selecionou nenhum item...")
                return this.cidadeMenu()

        }   //final do switc
    } //final do metodo
}   //classe
