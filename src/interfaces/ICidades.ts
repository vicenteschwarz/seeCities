import { Cidade } from "../entity/Cidades";

export interface ICidades {
    cod_cdc: number;
    city: string;
    state: string;
    country: string;
    climate: string;
    culture: string;
    tourist_att: string;

    listarCidades(): Promise<Cidade[]>;

    exibirID(city: string): Promise<number[]>;

    buscarPorID(cod_cdc: number): Promise<Cidade[]>;

    inserirCidade(city: string, state: string, country: string, climate: string, culture: string, tourist_att: string): Promise<void>;

    deletarCidade(cod_cdc: number)

    attInfosCidade(cod_cdc: number, coluna: string, registro: string): Promise<void>;
}