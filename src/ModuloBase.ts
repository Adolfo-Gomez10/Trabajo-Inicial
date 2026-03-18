import { IModulo } from './IModulo';

export abstract class ModuloBase implements IModulo {
    // Encapsulamiento: La integridad es privada, solo se modifica por métodos
    private integridad: number = 100;

    constructor(
        public nombre: string, 
        public readonly consumoEnergia: number // Solo lectura: el consumo no cambia
    ) {}

    public recibirImpacto(danio: number): void {
        this.integridad -= danio;
        if (this.integridad < 0) this.integridad = 0;
    }

    public getIntegridad(): number {
        return this.integridad;
    }

    // Método abstracto: el "cómo" funciona depende del tipo de módulo
    abstract funciona(): boolean;
}