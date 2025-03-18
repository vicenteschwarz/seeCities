import { Users } from "../entity/Users";

export interface IUsers {
    id_users: number;
    users: string;
    name_users: string;
    login_users: string;
    password_users: number;
    email_users: string;

    listarUsers(): Promise<Users[]>;

    inserirUser(users: string, name_users: string, login_users: string, password_users: number, email_users: string): Promise<string | null>;

    exibirID(login_users: string): Promise<number[]>;

    buscarPorID(id_users: number): Promise<Users[]>;

    deletarUser(id_users: number): Promise<void>;

    attInfosUser(id_users: number, coluna: string, registro: string): Promise<void>;
  }