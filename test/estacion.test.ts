import { AutobusBase } from '../src/AutoBase';
import { AutobusPasajeros } from '../src/AutoPasajeros';

class AutobusEscolar extends AutobusBase { // herencia: AutobusEscolar es un tipo específico de AutobusBase
	constructor(matricula: string, public nivelCombustible: number) {
		super(matricula, 8);
	}

	estaOperativo(): boolean {
		return this.getEstadoMecanico() > 50 && this.nivelCombustible >= 15;
	}
}

test('encapsulamiento: el estado mecanico cambia con metodos', () => {
	const bus = new AutobusPasajeros('AA111BB', 40);
	const base = bus as unknown as AutobusBase;

	expect(base.getEstadoMecanico()).toBe(100);

	base.sufrirDesgaste(30);
	expect(base.getEstadoMecanico()).toBe(70);

	base.sufrirDesgaste(1000);
	expect(base.getEstadoMecanico()).toBe(0);
});

test('herencia: AutobusPasajeros viene de AutobusBase', () => {
	const bus = new AutobusPasajeros('BB222CC', 30);

	expect(bus).toBeInstanceOf(AutobusPasajeros);
	expect(bus).toBeInstanceOf(AutobusBase);
});

test('abstraccion: cada clase define estaOperativo', () => {
	const bus1 = new AutobusPasajeros('CC333DD', 10);
	const bus2 = new AutobusEscolar('DD444EE', 20);

	expect(typeof bus1.estaOperativo).toBe('function');
	expect(typeof bus2.estaOperativo).toBe('function');
});

test('polimorfismo: mismo metodo, distinto resultado segun la clase', () => {
	const flota = [
		new AutobusPasajeros('EE555FF', 1),
		new AutobusEscolar('FF666GG', 20)
	];

	const resultados = flota.map((bus) => bus.estaOperativo());

	expect(resultados[0]).toBe(true);
	expect(resultados[1]).toBe(true);

	const busPasajeros = flota[0] as unknown as AutobusBase;
	const busEscolar = flota[1] as unknown as AutobusBase;

	busPasajeros.sufrirDesgaste(90);
	busEscolar.sufrirDesgaste(60);

	expect((flota[0] as AutobusPasajeros).estaOperativo()).toBe(false);
	expect((flota[1] as AutobusEscolar).estaOperativo()).toBe(false);
});
