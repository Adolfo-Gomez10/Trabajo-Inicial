import { AutobusBase } from '../src/AutoBase';
import { AutobusPasajeros } from '../src/AutoPasajeros';
import { Estacion } from '../src/Estacion';
import { IAutobus } from '../src/IAutobus';

class AutobusEscolar extends AutobusBase { // herencia: AutobusEscolar es un tipo especifico de AutobusBase
	constructor(matricula: string, public nivelCombustible: number) {
		super(matricula, 8);
	}

	estaOperativo(): boolean { 
		return this.getEstadoMecanico() > 50 && this.nivelCombustible >= 15;
	}
}

test('encapsulamiento: el estado mecanico cambia con metodos', () => {
	const bus = new AutobusPasajeros('AA111BB', 40);
	const base: AutobusBase = bus;

	expect(base.getEstadoMecanico()).toBe(100);// El estado mecanico inicial es 100

	base.sufrirDesgaste(30); //el metodo sufrirDesgaste reduce el estado mecanico en 30
	expect(base.getEstadoMecanico()).toBe(70); //verifico con get que el estado se redujo a 70

	base.sufrirDesgaste(1000);
	expect(base.getEstadoMecanico()).toBe(0);
});

test('herencia: AutobusPasajeros viene de AutobusBase', () => {
	const bus = new AutobusPasajeros('BB222CC', 30);

	expect(bus).toBeInstanceOf(AutobusBase); //verifico con instanceOf que bus es una instancia de AutobusBase
});

test('abstraccion: cada clase define estaOperativo', () => {
	const bus1 = new AutobusPasajeros('CC333DD', 10); 
	const bus2 = new AutobusEscolar('DD444EE', 20);

	expect(bus1.estaOperativo()).toBe(true); // Para AutobusPasajeros, esta operativo si el estado mecanico es > 20 y combustible > 0
	expect(bus2.estaOperativo()).toBe(true); // Para AutobusEscolar, esta operativo si el estado mecanico es > 50 y combustible >= 15

	bus1.sufrirDesgaste(60);
	bus2.sufrirDesgaste(60);

	expect(bus1.estaOperativo()).toBe(true); // Aunque el estado mecanico es 40, sigue operativo porque el combustible es > 0
	expect(bus2.estaOperativo()).toBe(false); // El estado mecanico es < 50, por lo que no esta operativo aunque el combustible sea suficiente
});

test('polimorfismo: mismo metodo, distinto resultado segun la clase', () => {
	const contarOperativos = (buses: AutobusBase[]): number => { // El mismo metodo se comporta diferente segun el tipo de autobus
		return buses.filter((bus) => bus.estaOperativo()).length; //con filter y length cuento cuantos autobuses estan operativos en la flota
	};

	const flota: AutobusBase[] = [  //inicializo una flota con diferentes tipos de autobuses
		new AutobusPasajeros('EE555FF', 1),
		new AutobusEscolar('FF666GG', 20)
	];

	expect(contarOperativos(flota)).toBe(2); //verifico que ambos autobuses estan operativos al inicio

	flota[0].sufrirDesgaste(90); // El AutobusPasajeros ya no esta operativo porque el estado mecanico es < 20
	flota[1].sufrirDesgaste(60); // El AutobusEscolar ya no esta operativo porque el estado mecanico es < 50, aunque el combustible todavia es suficiente

	expect(contarOperativos(flota)).toBe(0); //verifico que ninguno de los autobuses esta operativo despues del desgaste, demostrando que el mismo metodo estaOperativo se comporta diferente segun la clase del autobus
});

test('interfaz: AutobusBase cumple el contrato IAutobus', () => {
	const validarContrato = (bus: IAutobus): boolean => { 
		return typeof bus.matricula === 'string' 
			&& typeof bus.consumoCombustible === 'number' 
			&& typeof bus.estaOperativo === 'function'; 
	};

	const baseComoPasajeros: AutobusBase = new AutobusPasajeros('II999JJ', 10); // Puedo tratar un AutobusPasajeros como un AutobusBase porque hereda de el, y tambien cumple el contrato de IAutobus
	const baseComoEscolar: AutobusBase = new AutobusEscolar('JJ000KK', 20); // Puedo tratar un AutobusEscolar como un AutobusBase porque hereda de el, y tambien cumple el contrato de IAutobus

	expect(validarContrato(baseComoPasajeros)).toBe(true); //verifico que el AutobusPasajeros cumple el contrato de IAutobus
	expect(validarContrato(baseComoEscolar)).toBe(true); //verifico que el AutobusEscolar cumple el contrato de IAutobus
});

test('sobrecarga: sufrirDesgaste acepta daño leve, normal y fuerte', () => {
	const bus = new AutobusPasajeros('LL111MM', 30);

	bus.sufrirDesgaste('leve');
	expect(bus.getEstadoMecanico()).toBe(90);

	bus.sufrirDesgaste('normal');
	expect(bus.getEstadoMecanico()).toBe(75);

	bus.sufrirDesgaste('fuerte');
	expect(bus.getEstadoMecanico()).toBe(35);
});

test('filtro: mostrar solo buses operativos', () => {
	const estacion = new Estacion();
	const busPasajeros = new AutobusPasajeros('MM222NN', 10);
	const busEscolarOperativo = new AutobusEscolar('NN333OO', 25);
	const busEscolarNoOperativo = new AutobusEscolar('OO444PP', 10);

	estacion.agregarBus(busPasajeros);
	estacion.agregarBus(busEscolarOperativo);
	estacion.agregarBus(busEscolarNoOperativo);

	const operativos = estacion.mostrarBusesOperativos();// El metodo mostrarBusesOperativos devuelve solo los buses que estan operativos segun su propia logica de estaOperativo

	expect(operativos).toHaveLength(2); //verifico que solo hay 2 buses operativos en la estacion
	expect(operativos).toContain(busPasajeros); //buspasajeros esta oprativo
	expect(operativos).toContain(busEscolarOperativo); //busEscolarOperativo esta operativo
	expect(operativos).not.toContain(busEscolarNoOperativo); //busEscolarNoOperativo no esta operativo porque el estado mecanico es < 50 y el combustible es < 15, por lo que no debe aparecer en la lista de operativos
});
