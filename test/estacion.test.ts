import { ModuloOxigeno } from '../src/ModuloOxigeno';

describe('Pruebas del Sistema de la Estación Espacial', () => {

    test('Debe crear un módulo con 100% de integridad al inicio', () => {
        const oxigeno = new ModuloOxigeno("Soporte Vital Alfa", 50);
        expect(oxigeno.getIntegridad()).toBe(100);
    });

    test('El módulo debe seguir funcionando si tiene suficiente integridad y reserva', () => {
        const oxigeno = new ModuloOxigeno("Soporte Vital Beta", 50);
        oxigeno.recibirImpacto(30); // Baja a 70%
        expect(oxigeno.funciona()).toBe(true);
    });

    test('Polimorfismo: El módulo de oxígeno debe fallar si la integridad es muy baja (<= 20)', () => {
        const oxigeno = new ModuloOxigeno("Soporte Vital Gamma", 100);
        oxigeno.recibirImpacto(85); // Baja a 15%
        
        // Según nuestra lógica en ModuloOxigeno.ts, debería devolver false
        expect(oxigeno.funciona()).toBe(false);
    });

    test('El módulo debe fallar si se queda sin reserva de oxígeno', () => {
        const oxigeno = new ModuloOxigeno("Soporte Vital Delta", 0); // Sin reserva
        expect(oxigeno.funciona()).toBe(false);
    });

});