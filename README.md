# API Rest - Ecommerce

# Detalle
Trabajo final para la cursada de Backend en Coderhouse, se trata de una API desarrollada en Node.JS que permite levantar un servidor backend junto con un front sencillo. 
Cuenta con funcionalidad de logueo/creación de cuenta con un tiempo de sesión configurable. El registro de usuarios crea por defecto un perfil "user" que tiene acceso 
a los productos, manipular el carrito (agregar, eliminar, confirmar compra) y una sección donde puede ver su propio historial de pedidos. Por último cuenta con una 
sección de chat donde cada usuario se puede poner en contacto con el administrador para realizar consultas, todo en tiempo real.
<br>
El perfil administrador (no se puede crear uno nuevo si no que está por defecto o bien se puede modificar desde la DB su "role") cuenta con un panel de acceso privado
que le permite hacer un CRUD completo de productos (se sumarán automáticamente al ecommerce para todos los users). También tiene una sección de carritos donde puede 
ver todas las cuentas con carritos y conocer los productos que allí tienen pendientes de compra. Otro apartado que dispone este perfil es el de seguimiento de órdenes,
donde puede ver TODAS las órdenes de todos los usuarios, por defecto las mismas se crean con el estado "generada", por lo que el admin puede marcarlas como "Entregado"
simulando que el pedido ya fue despachado (esta actualización la verá el usuario para tener un seguimiento de su pedido). Por último, tiene acceso al chat de consultas 
donde tiene los mensajes de todos los usuarios que le hayan escrito, pudiendo seleccionar de una lista el usuario con el que quiere chater.


# Instalación
- Para correr la app puedes:
1. Clonar el repositorio y utilizarlo de manera local

2. Levantar el servidor de manera local con el comando:

    `npm run dev` para modo de desarrollo o `npm start`

3. Crear el archivo .env con las variables de entorno necesarias para lograr el funcionamiento del servidor:

DB_URL_MONGO= url de la base de datos de mongo
PERS= mongo o firebase
DEFAULT_PORT= puerto por defecto
MODE= cluster o no 
EMAIL= email de administrador
EMAIL_PASS= password
TWILIO_ACCOUNT_SID= Datos de Twilio para confirmar por sms
TWILIO_AUTH_TOKEN= Datos de Twilio para confirmar por sms
ADMIN_PHONE= Teléfono del admin para que se le notifique ante nuevas compras
JWT_SECRET= hash secreto

# Métodos
Algunos métodos están protegidos por JSON Web Token para que sólo puedan realizarse por un usuario logueado o bien si tiene afectación directa al negocio (como hacer
update a un producto) sólo el perfil de admin pueda hacerlo

<br>

# Productos

1 . Obtener todos los productos o uno por id
GET:
/api/productos/${id?}
2 . Buscar producto por categoría
GET:
/api/productos/categoria/${category}
3 . Agregar producto
POST:
/api/productos

Body:
{
    "nombre": "Producto de prueba",
    "descripcion": "Mouse ultra DPI Logitech",
    "codigo": 3312,
    "foto": "https://picsum.photos/212",
    "precio": 1554,
    "stock": 24,
    "categoria": "Electrónica"
  }
4 . Modificar un producto
PUT:
/api/productos/${id}

Body:
{
    "nombre": "Producto de prueba",
    "descripcion": "Teclado Rzr",
    "codigo": 123,
    "foto": "https://picsum.photos/202",
    "precio": 5000,
    "stock": 2,
    "categoria": "Electrónica"
  }
5 . Eliminar un producto
DELETE:
/api/productos/${id}
<br>

# Carrito

1. Obtener los productos de un carrito puntual
GET:
/api/carrito/${id}/productos
2 . Obtener todos los carritos
GET:
/api/carrito/
3 . Crear un nuevo carrito
POST:
/api/carrito/

Body:
{
    "email": "ejemplo@gmail.com",
    "address": "Mechita Targaryen"
}
4 . Agregar un producto a un carrito
POST:
/api/carrito/${id}/productos/${id}
5 . Eliminar un producto del carrito
DELETE:
/api/carrito/${id}/productos/${id}

6 . Eliminar un carrito entero
DELETE:
/api/carrito/${id}
<br>

# Ordenes
   
1 . Obtener todas las órdenes
GET:
/api/ordenes/
2 . Marcar como completa
PUT:
/api/ordenes/${id}

<br>

# Listado de librerías y herramientas utilizadas:
- bcrypt
- cors
- dotenv
- express-session
- firebase
- log4js
- mongoose
- nodemailer
- passport / passport-local
- socket.io
- twilio
- uniqid# Documentar-Api
