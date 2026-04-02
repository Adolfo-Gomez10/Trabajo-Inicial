import { IAutobus } from './IAutobus';

export abstract class AutobusBase implements IAutobus { 
    // Encapsulamiento: El estado mecánico es privado, solo se modifica por métodos
    private estadoMecanico: number = 100;

    constructor(
        public matricula: string, 
        public readonly consumoCombustible: number // Solo lectura: el consumo no cambia
    ) {}

    public sufrirDesgaste(daño: number): void;
    public sufrirDesgaste(nivel: 'leve' | 'normal' | 'fuerte'): void;
    public sufrirDesgaste(dañoNivel: number | 'leve' | 'normal' | 'fuerte'): void { // El desgaste reduce el estado mecánico
        const daño =
            typeof dañoNivel === 'number' // Si es un número, lo uso directamente como daño
                ? dañoNivel // Si es un nivel, lo convierto a daño según la gravedad
                : dañoNivel === 'leve'
                    ? 10
                    : dañoNivel === 'normal'
                        ? 15
                        : dañoNivel === 'fuerte'
                            ? 40
                            : 0; // Si no es un nivel válido, no hay daño

        this.estadoMecanico -= daño;
        if (this.estadoMecanico < 0) this.estadoMecanico = 0; // No puede ser negativo 
    }

    public getEstadoMecanico(): number {
        return this.estadoMecanico; //devuelve el estado mecánico actual del autobús
    }

    // Método abstracto: cada subclase define su propio comportamiento (polimorfismo)
    abstract estaOperativo(): boolean;
}