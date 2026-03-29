import { IAutobus } from './IAutobus';

export abstract class AutobusBase implements IAutobus { 
    // Encapsulamiento: El estado mecánico es privado, solo se modifica por métodos
    private estadoMecanico: number = 100;

    constructor(
        public matricula: string, 
        public readonly consumoCombustible: number // Solo lectura: el consumo no cambia
    ) {}

    public sufrirDesgaste(danio: number): void { // El desgaste reduce el estado mecánico
        this.estadoMecanico -= danio;
        if (this.estadoMecanico < 0) this.estadoMecanico = 0; // No puede ser negativo 
    }

    public getEstadoMecanico(): number {
        return this.estadoMecanico; //devuelve el estado mecánico actual del autobús
    }

    // Método abstracto: cada subclase define su propio comportamiento (polimorfismo)
    abstract estaOperativo(): boolean;
}