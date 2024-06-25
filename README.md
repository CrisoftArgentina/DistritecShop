# Portal Distritec v.1.0.1

Este proyecto va a ser una combinación entre un ecommerce y un portal de usuario. El objetivo del mismo con cada usuario poder realizar compras, ver los estados de los pedidos, facturas, realizar presupuestos.

## v.1.0.1
### Modulos
- Home (Componente principal del proyecto)
-	Category (Componente filtrado por categoria)
-	Item (Componente con el detalle en específico del producto)
-	ConfirmarPedido (Componente lo cual muestra el detalle del pedido del lado izquierdo y del derecho logueo *)
-	MisPedidos (Componente que muestra todos los pedidos realizados con el correo logueado)
-	DetallePedido (Componente lo cual muestra el detalle del pedido ya creado)

*El componente de logueo contiene una serie de funciones, lo cual comprueba siempre por correo.
Si el correo existe en la base de datos, se habilita el input para colocar la contraseña y luego de comprobar los dos, renderiza el componente savePedido. Si el correo no existe habilita el componente newLogin, lo cual crea la cuenta y luego renderiza el componente savePedido

### Colecciones de la Base de Datos (Firestore)
-	**Clientes**: Hospeda todos los datos referidos al cliente
    - ***Campos***: *Nombre (cadena), Apellido (cadena), Contrasena (cadena), Direccion (cadena), Email (cadena), Localidad (cadena)*

- **Counters**: Hospeda el último número de pedido
    - ***Campo***: *current (número)*

- **DetallePedido**: Hospeda todos los datos de los items con referencia al pedido
    - ***Campos***: *Cantidad (número)*, *Descripcion (cadena)*, *PedidoRef (referencia)*, *precio (número)*, *ProductoCodigo (cadena)*, *Url (cadena)*.

- **Pedidos**: Hospeda todos los datos del pedido.
    - ***Campos***: *ClienteRef (referencia)*, *EstadoEnvio (número)*, *Fecha (timestamp)*, *Numero (número)*, *Total (número)*.

- **Productos**: Hospeda todos los datos de los productos.
    - ***Campos***: *Stock (número)*, *Codigo (cadena)*, *Descripcion (cadena)*, *Destacado (número)*, *Id (cadena)*, *Img (candena)*, *Nombre (string)*, *Precio (número)*, *TipoProducto (string)*