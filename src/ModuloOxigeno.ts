import { ModuloBase } from './ModuloBase';

export class ModuloOxigeno extends ModuloBase {
    constructor(nombre: string, public nivelReserva: number) {
        super(nombre, 10); // Consume 10 de energía
    }

    // Polimorfismo: funciona si tiene integridad y si tiene reserva de O2
    funciona(): boolean {
        return this.getIntegridad() > 20 && this.nivelReserva > 0;
    }
}