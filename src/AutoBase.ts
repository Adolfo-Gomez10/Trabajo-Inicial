import { IAutobus } from './IAutobus';

export abstract class AutobusBase implements IAutobus { 
    // Encapsulamiento: El estado mecanico es privado, solo se modifica por metodos
    private estadoMecanico: number = 100;

    constructor(
        public matricula: string, 
        public readonly consumoCombustible: number // Solo lectura: el consumo no cambia
    ) {}

    public sufrirDesgaste(daño: number): void;
    public sufrirDesgaste(nivel: 'leve' | 'normal' | 'fuerte'): void;
    public sufrirDesgaste(dañoNivel: number | 'leve' | 'normal' | 'fuerte'): void { // El desgaste reduce el estado mecanico
        const daño =
            typeof dañoNivel === 'number' // Si es un numero, lo uso directamente como daño
                ? dañoNivel // Si es un nivel, lo convierto a daño segun la gravedad
                : dañoNivel === 'leve'
                    ? 10
                    : dañoNivel === 'normal'
                        ? 15
                        : dañoNivel === 'fuerte'
                            ? 40
                            : 0; // Si no es un nivel valido, no hay daño

        this.estadoMecanico -= daño;
        if (this.estadoMecanico < 0) this.estadoMecanico = 0; // No puede ser negativo 
    }

    public getEstadoMecanico(): number {
        return this.estadoMecanico; //devuelve el estado mecanico actual del autobus
    }

    // Metodo abstracto: cada subclase define su propio comportamiento (polimorfismo)
    abstract estaOperativo(): boolean;
}