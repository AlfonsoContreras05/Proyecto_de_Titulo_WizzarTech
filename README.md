🧙‍♂️ WizzardTech
Sistema de Cotizaciones y Administración de Productos, Clientes y Ventas

WizzardTech es una plataforma integral para la gestión comercial, desarrollada para optimizar la administración de cotizaciones, productos, clientes y ventas. Utiliza tecnologías modernas para proporcionar una experiencia intuitiva y eficiente a los usuarios, permitiendo una gestión rápida y centralizada de toda la información relevante.

🛠️ Tecnologías Utilizadas


🏗️ Estructura del Proyecto
El proyecto está dividido en dos partes principales:

1. Frontend (Cliente)
Framework: HTML5, CSS3, JavaScript.
Objetivo: Proporcionar una interfaz de usuario sencilla e intuitiva para gestionar productos, clientes, cotizaciones y ventas.
2. Backend (Servidor)
Framework: PHP.
Base de Datos: MySQL mediante XAMPP.
Objetivo: Proveer una API RESTful para la gestión de datos, autenticación y seguridad del sistema.
📂 Estructura de Carpetas
/frontend/: Contiene todo el código relacionado con el cliente.
/backend/: Contiene todo el código para el backend y la API.
/database/: Incluye el archivo SQL para la base de datos y scripts de configuración.
/docs/: Aquí se almacena toda la documentación técnica y funcional del proyecto.
🚀 Instalación y Ejecución
Requisitos del Sistema
XAMPP: Para ejecutar el servidor local y gestionar la base de datos.
Navegador Web: Cualquier navegador actualizado (Chrome, Firefox, Edge, etc.).
Pasos de Instalación
Clona el repositorio:

bash
Copiar código
git clone https://github.com/tu-usuario/wizzardtech.git
Configura el entorno local con XAMPP:

Copia los archivos del proyecto a la carpeta htdocs de XAMPP.
Inicia Apache y MySQL desde el panel de control de XAMPP.
Configura la base de datos:

Abre phpMyAdmin y crea una base de datos llamada wizzardtech_db.
Importa el archivo wizzardtech_db.sql que se encuentra en la carpeta /database.
Configura las credenciales del entorno:

Edita el archivo /backend/config.php y actualiza los valores según la configuración local:
env
Copiar código
DB_HOST=localhost  
DB_USER=tu_usuario  
DB_PASS=tu_contraseña  
DB_NAME=wizzardtech_db  
Accede al sistema:

Abre tu navegador y visita:
arduino
Copiar código
http://localhost/wizzardtech
📜 Rutas Principales de la API
Cotizaciones
GET /cotizaciones - Muestra todas las cotizaciones.
POST /cotizaciones - Crea una nueva cotización.
Productos
GET /productos - Lista todos los productos disponibles.
POST /productos - Agrega un nuevo producto.
PUT /productos/:id - Actualiza un producto existente.
DELETE /productos/:id - Elimina un producto.
Clientes
GET /clientes - Muestra todos los clientes registrados.
POST /clientes - Añade un nuevo cliente.
🚧 Próximas Actualizaciones
Reportes: Implementación de reportes gráficos para el análisis de ventas y productos.
Sistema de Usuarios: Control de permisos y roles para garantizar la seguridad.
Exportación de Datos: Soporte para exportar información a PDF o Excel.
🤝 Contribuciones
Las contribuciones son bienvenidas. Si deseas contribuir, sigue estos pasos:

Haz un fork del proyecto.
Crea una nueva rama (feature/nueva-funcionalidad).
Realiza un pull request con una descripción detallada.
📬 Contacto
Para más información o para reportar problemas, puedes contactarnos:
📧 Correo Electrónico: soporte@wizzardtech.com
🌐 Sitio Web: www.wizzardtech.com

📝 Licencia
Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.
