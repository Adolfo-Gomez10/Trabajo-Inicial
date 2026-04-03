import { AutobusBase } from './AutoBase';

export class Estacion {
    constructor(private readonly buses: AutobusBase[] = []) {}

    public agregarBus(bus: AutobusBase): void {
        this.buses.push(bus);
    }

    public mostrarBusesOperativos(): AutobusBase[] {
        return this.buses.filter((bus) => bus.estaOperativo());
    }
}
