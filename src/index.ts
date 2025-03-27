

import { Devs } from "./entity/Devs"
import { Users } from "./entity/Users"
import { CidadeService } from "./service/cidadesService" //ATUAL 
import { DevsService } from "./service/devsService" //ATUAL
import { UserService } from "./service/usersService" //ATUAL
import { Criptografia } from "./util/criptografia"
import { Email } from "./util/email"
import { CidadeMenu } from "./view/CidadesView"
import { MenuDevs } from "./view/devsView"
import { Menu } from "./view/menu"
import { MenuUsers } from "./view/usersView"


/*
let cdc1 = new CDC('São Paulo', 'São Paulo', 'Brasil', 'Quente', 'Bailao e Praia', 'Morumbis', 1)
console.log(cdc1.exibirInfos())

let dev1 = new Devs(1, 'Rodrigo', 'Rodrigo Moraes', 'ramoraes', 1234)
console.log(dev1.exibirInfos('1234'))

let user1 = new User(1, 'Negao', 'Jaime da Silva Pinto', 'Negaozinho', 2323)
console.log(user1.exibirInfos('2323'))
*/


//CIDADES --------------------------------------------
const view_Cidade = new CidadeMenu()
async function teste_view_cidades(){
    await view_Cidade.cidadeMenu()
}
//teste_view_cidades()

//DEVS -----------------------------------------------
const view_Dev = new MenuDevs()
async function teste_view_devs(){
    await view_Dev.devMenu()
}
//teste_view_devs()

//USERS ----------------------------------------------
const view_User = new MenuUsers()
async function teste_view_users(){
    await view_User.userMenu()
}
//teste_view_users()

//------------------------------------------------------
const view_MENU = new Menu()
async function teste_view_MENU(){
    try {
        await view_MENU.verificacaoDeAcesso()
    } catch (error) {
        // we'll proceed, but let's report it
        console.log(error.message)
    }
}
    teste_view_MENU()
