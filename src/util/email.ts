import { Devs } from "../entity/Devs";
import { DevsRepository } from "../repository/devsRepository";
import { DevsService } from "../service/devsService";

export class Email{

    static verificarEmail(email:string):boolean{
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email)
}
}