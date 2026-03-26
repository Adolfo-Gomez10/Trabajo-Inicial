export interface IAutobus {
    matricula: string;
    consumoCombustible: number;
    estaOperativo(): boolean;
}
