# Point of Sale Vue

¡Bienvenido a Point of Sale Vue! Esta aplicación está diseñada para facilitar la gestión y el seguimiento de ventas en una tienda de ropa. Con una interfaz intuitiva, los trabajadores y administradores pueden mantener un registro organizado de las ventas, gestionar el inventario y mejorar la eficiencia en la tienda.

## Características Clave

- **Registro de Ventas**: Los trabajadores pueden agregar ventas a la plataforma, incluyendo detalles como los productos vendidos y la cantidad. Si hay un cupón de descuento, también se puede aplicar a la venta.

- **Gestión de Inventario**: La vista de inventario permite a los usuarios ver y editar los productos disponibles. Pueden actualizar el nombre, la imagen, el precio y la cantidad de productos.

- **Seguimiento de Stock**: Si la cantidad de un producto llega a cero después de una venta, se elimina automáticamente de la vista principal. En la vista de inventario, se puede agregar más stock si llega nuevo inventario.

- **Calendario de Resumen**: La vista de calendario permite seleccionar una fecha y ver un resumen de las ventas de ese día, incluido el total de ventas para el día.

## Tecnologías Utilizadas

- **Vue 3**: El proyecto se construyó utilizando Vue 3 para aprovechar las últimas características y mejoras en el framework.

- **FormKit**: Se utilizó FormKit para simplificar la creación y validación de formularios en la aplicación.

- **Tailwind CSS**: Se implementó Tailwind CSS para estilizar la aplicación de manera eficiente y consistente.

- **Pinia**: Pinia se utilizó para gestionar el estado global de la aplicación de manera efectiva.

- **Vue Router**: Vue Router permitió la creación de rutas y la navegación fluida entre las diferentes vistas de la aplicación.

- **Vue Tailwind Datepicker**: Se incorporó Vue Tailwind Datepicker para proporcionar un calendario interactivo para ver los resúmenes de ventas.

- **Firebase**: Firebase se utilizó como backend para almacenar datos y gestionar transacciones. Se exploraron conceptos avanzados como consultas con "where" y transacciones para garantizar la integridad de los datos.

## Instalación y Uso

1. Clona este repositorio: `git clone https://github.com/euss99/point-of-sale-vue.git`
2. Navega a la carpeta del proyecto: `cd point-of-sale-vue`
3. Instala las dependencias: `npm install`
4. Inicia el servidor de desarrollo: `npm run serve`
5. Abre tu navegador y visita: `http://localhost:5173`

## Aprendizaje Destacado

Durante el desarrollo de esta aplicación, se adquirieron valiosos conocimientos en la implementación de un sistema de ventas y gestión de inventario utilizando las tecnologías mencionadas. Se profundizó en la creación de formularios eficientes con FormKit, el manejo de estados globales con Pinia y la creación de rutas con Vue Router. Además, se exploraron capacidades avanzadas de Firebase, como consultas y transacciones, para crear una experiencia segura y confiable para los usuarios.
