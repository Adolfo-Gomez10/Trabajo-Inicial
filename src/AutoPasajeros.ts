import { AutobusBase } from './AutoBase';

export class AutobusPasajeros extends AutobusBase {
    constructor(matricula: string, public nivelCombustible: number) {
        super(matricula, 10);
    }

    estaOperativo(): boolean {
        return this.getEstadoMecanico() > 20 && this.nivelCombustible > 0;
    }
}
