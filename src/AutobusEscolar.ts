import { AutobusBase } from './AutoBase';

export class AutobusEscolar extends AutobusBase {
    constructor(matricula: string, public nivelCombustible: number) {
        super(matricula, 8);
    }

    estaOperativo(): boolean {
        return this.getEstadoMecanico() > 50 && this.nivelCombustible >= 15;
    }
}


 