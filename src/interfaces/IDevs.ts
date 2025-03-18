import { Devs } from "../entity/Devs";

export interface IDevs {
    id_devs: number;
    devs: string;
    name_devs: string;
    login_devs: string;
    password_devs: number;
    email: string;

    listarDevs(): Promise<Devs[]>;

    inserirDev(devs: string, name_devs: string, login_devs: string, password_devs: number, email_devs: string): Promise<string | null>;

    exibirID(login_devs: string): Promise<number[]>;

    buscarPorID(id_devs: number): Promise<Devs[]>;

    deletarDev(id_devs: number): Promise<void>;

    attInfosDev(id_devs: number, coluna: string, registro: string): Promise<void>;
}