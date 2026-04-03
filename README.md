# Sistema de Terminal de Autobuses - TypeScript POO

Proyecto inicial para practicar los pilares de la Programación Orientada a Objetos y Testing Unitarios.

Este codigo trata sobre una terminal de autobuses con distintos tipos de unidades (pasajeros y escolar), aplicando reglas propias para determinar si cada bus esta operativo. Tambien incluye una estacion que permite gestionar una flota y mostrar solo los buses operativos mediante filtros.

## Conceptos Aplicados:
* **Abstracción:** Uso de interfaces (`IAutobus`) y clases abstractas (`AutobusBase`).
* **Encapsulamiento:** Propiedades protegidas (`private`, `readonly`) y métodos de acceso como `getEstadoMecanico()` y `sufrirDesgaste()`.
* **Herencia:** Especialización de autobuses (Ej: `AutobusPasajeros`).
* **Polimorfismo:** Implementación específica del método `estaOperativo()`.
* **Sobrecarga de Métodos:** Sobrecarga del metodo `SufrirDesgaste`.
* **Filtros:** Uso de `filter` para mostrar solo buses operativos (ejemplo: `mostrarBusesOperativos()`).
* **Testing:** Pruebas unitarias con Jest.

