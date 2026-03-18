export interface IModulo {
    nombre: string;
    consumoEnergia: number;
    funciona(): boolean; // Un contrato: cualquier clase que implemente esta interfaz debe tener este método
}