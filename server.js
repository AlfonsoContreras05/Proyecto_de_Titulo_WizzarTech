const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const jwtConfig = require("./jwtConfig"); // Asegúrate de que la ruta sea correcta

const app = express();
const bcrypt = require('bcrypt');
const saltRounds = 10; 
// Configuración de middleware
app.use(express.json());
app.use(cors());

// Configurar conexión a la base de datos
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sistemacotizaciones",
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) throw err;
  console.log("Conexión a la base de datos establecida");
});

// Iniciar el servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (!bearerHeader) {
    return res.status(403).send("Se requiere un token para la autenticación");
  }
  const bearer = bearerHeader.split(" ");
  const bearerToken = bearer[1];
  req.token = bearerToken;

  try {
    const decoded = jwt.verify(req.token, jwtConfig.secret);
    req.usuario = decoded;
  } catch (error) {
    return res.status(401).send("Token inválido o expirado");
  }

  next();
};

module.exports = verifyToken;
//hola
// Endpoint para el inicio de sesión


app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Primero, obtén el hash de la contraseña de la base de datos
  db.query(
    "SELECT ID_Vendedor, Nombre, pass FROM vendedor WHERE Correo_Electronico = ?",
    [email],
    (err, vendedorResults) => {
      if (err) {
        console.error("Error en el servidor:", err);
        return res.status(500).send("Error en el servidor");
      }

      if (vendedorResults.length > 0) {
        // Compara la contraseña ingresada con el hash almacenado
        bcrypt.compare(password, vendedorResults[0].pass, (err, result) => {
          if (err) {
            return res.status(500).send("Error al verificar la contraseña");
          }

          if (result) {
            // Si la contraseña es correcta
            const vendedorData = {
              ID_Vendedor: vendedorResults[0].ID_Vendedor,
              Nombre: vendedorResults[0].Nombre,
            };
            const token = jwt.sign({ vendedor: vendedorData }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
            return res.status(200).json({ vendedor: vendedorData, token });
          } else {
            // Contraseña incorrecta
            return res.status(401).send("Credenciales incorrectas");
          }
        });
      } else {
        // Usuario no encontrado, maneja según lo necesario
        return res.status(401).send("Credenciales incorrectas");
      }
    }
  );
});


app.post("/login-adm", (req, res) => {
  const { email, password } = req.body;

  // Consulta para verificar las credenciales del administrador
  db.query(
    "SELECT ID_Administrador, Nombre FROM administrador WHERE Correo_Electronico = ? AND pass = ?",
    [email, password],
    (err, adminResults) => {
      if (err) {
        console.error("Error en el servidor:", err);
        return res.status(500).send("Error en el servidor");
      }

      if (adminResults.length > 0) {
        // Las credenciales son correctas
        const adminData = {
          ID_Administrador: adminResults[0].ID_Administrador,
          Nombre: adminResults[0].Nombre,
          // Otros campos necesarios para el administrador
        };

        // Generar el token JWT
        const token = jwt.sign({ administrador: adminData }, jwtConfig.secret, {
          expiresIn: jwtConfig.expiresIn,
        });

        // Enviar los datos del administrador y el token
        return res.status(200).json({ administrador: adminData, token });
      } else {
        // Credenciales incorrectas
        return res
          .status(401)
          .send("Credenciales incorrectas para administrador");
      }
    }
  );
});
// Nuevo endpoint para obtener todos los productos
app.get("/api/productos", (req, res) => {
  const query = `
    SELECT 
      p.ID_Producto, 
      p.Nombre, 
      p.Descripcion, 
      p.Precio, 
      p.ID_Categoria, 
      p.Stock, 
      c.Nombre AS NombreCategoria, 
      i.URL AS ImagenURL
    FROM producto p
    JOIN categoria_producto c ON p.ID_Categoria = c.ID_Categoria
    LEFT JOIN imagenes i ON p.ID_Producto = i.ID_Producto;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error al obtener productos:", err);
      return res.status(500).send("Error en el servidor");
    }
    res.json(results);
  });
});

// Endpoint para guardar cotización
app.post("/api/guardar-cotizacion", verifyToken, async (req, res) => {
  const { cliente, productos, ID_Vendedor } = req.body;
  console.log("ID Vendedor recibido:", ID_Vendedor);

  try {
    console.log("datos recibidos: ", req.body);
    console.log("ID Vendedor recibido:", ID_Vendedor);

    await db.promise().beginTransaction();

    const [vendedorExistente] = await db
      .promise()
      .query("SELECT * FROM vendedor WHERE ID_Vendedor = ?", [ID_Vendedor]);
    if (vendedorExistente.length === 0) {
      throw new Error("Vendedor no encontrado");
    }

    const clienteData = {
      Nombre: cliente.nombre,
      Apellido: cliente.apellido,
      rut: cliente.rut,
      Direccion: cliente.direccion,
      Correo_Electronico: cliente.correo,
      Telefono: cliente.celular,
    };

    const [clienteResult] = await db
      .promise()
      .query("INSERT INTO cliente SET ?", clienteData);
    const clienteId = clienteResult.insertId;

    let cotizacionData = {
      ID_Cliente: clienteId,
      Fecha_Cotizacion: new Date(),
      Estado: "Pendiente",
      ID_Vendedor: isNaN(parseInt(ID_Vendedor)) ? null : parseInt(ID_Vendedor),
    };

    const [cotizacionResult] = await db
      .promise()
      .query("INSERT INTO cotizacion SET ?", cotizacionData);
    const cotizacionId = cotizacionResult.insertId;

    for (const producto of productos) {
      const detalle = {
        ID_Cotizacion: cotizacionId,
        ID_Producto: producto.ID_Producto,
        Cantidad: producto.Cantidad,
        Precio_Unitario: producto.Precio,
        ID_Vendedor: cotizacionData.ID_Vendedor, // Incluyendo ID_Vendedor en cada detalle
      };
      await db.promise().query("INSERT INTO detalle_venta SET ?", detalle);
    }

    await db.promise().commit();
    res
      .status(200)
      .send(`Cotización guardada con éxito. ID de Cotización: ${cotizacionId}`);
  } catch (error) {
    await db.promise().rollback();
    console.error("Error al guardar la cotización:", error);
    res.status(500).send("Error al guardar la cotización");
  }
});

// Nuevo endpoint para obtener detalles de una cotización
app.get("/api/cotizaciones-vendedor/:idVendedor", async (req, res) => {
  const idVendedor = req.params.idVendedor;

  try {
    const query = `
        SELECT 
        c.ID_Cotizacion, 
        c.Fecha_Cotizacion, 
        c.Estado,
        GROUP_CONCAT(d.ID_Producto) AS Productos,
        SUM(d.Precio_Unitario * d.Cantidad) AS Total,
        TIMESTAMPDIFF(HOUR, c.Fecha_Cotizacion, NOW()) AS HorasTranscurridas
    FROM 
        cotizacion c
    JOIN 
        detalle_venta d ON c.ID_Cotizacion = d.ID_Cotizacion
    WHERE 
        c.ID_Vendedor = ? AND c.Estado != 'Pagado'
    GROUP BY 
        c.ID_Cotizacion;
    
        `;

    const [cotizaciones] = await db.promise().query(query, [idVendedor]);

    const cotizacionesActualizadas = cotizaciones.map((cot) => {
      let estadoActualizado = cot.Estado;
      if (cot.HorasTranscurridas > 48) {
        estadoActualizado = "Expirado";
      } else if (cot.HorasTranscurridas < 48 && cot.HorasTranscurridas > 24) {
        estadoActualizado = "Caducará Pronto";
      } else if (cot.HorasTranscurridas < 24) {
        estadoActualizado = "Nueva";
      }

      return {
        ...cot,
        productos: cot.Productos.split(",").map(Number),
        total: parseFloat(cot.Total),
        Estado: estadoActualizado, // Actualiza el estado
      };
    });

    res.json(cotizacionesActualizadas);
  } catch (error) {
    console.error("Error al obtener cotizaciones del vendedor:", error);
    res.status(500).send("Error en el servidor");
  }
});

app.get("/api/ventas-vendedor/:idVendedor", async (req, res) => {
  const idVendedor = req.params.idVendedor;

  try {
    const query = `
          SELECT 
              DATE_FORMAT(c.Fecha_Cotizacion, '%Y-%m-%d') AS Fecha,
              SUM(d.Precio_Unitario * d.Cantidad) AS TotalVenta
          FROM 
              cotizacion c
          JOIN 
              detalle_venta d ON c.ID_Cotizacion = d.ID_Cotizacion
          WHERE 
              c.ID_Vendedor = ?
          GROUP BY 
              DATE(c.Fecha_Cotizacion);
      `;
    const [ventas] = await db.promise().query(query, [idVendedor]);
    res.json(ventas);
  } catch (error) {
    console.error("Error al obtener ventas del vendedor:", error);
    res.status(500).send("Error en el servidor");
  }
});

// Endpoint para obtener detalles de una cotización específica
app.get("/api/detalles-cotizacion/:idCotizacion", async (req, res) => {
  const idCotizacion = req.params.idCotizacion;

  try {
    const query = `
      SELECT 
        c.ID_Cotizacion, c.Fecha_Cotizacion, c.Estado, 
        v.Nombre as NombreVendedor, v.Apellido as ApellidoVendedor,
        p.ID_Producto, p.Nombre as NombreProducto, p.Descripcion, 
        d.Cantidad, d.Precio_Unitario
      FROM 
        cotizacion c
      JOIN 
        detalle_venta d ON c.ID_Cotizacion = d.ID_Cotizacion
      JOIN 
        producto p ON d.ID_Producto = p.ID_Producto
      JOIN
        vendedor v ON c.ID_Vendedor = v.ID_Vendedor
      WHERE 
        c.ID_Cotizacion = ?;
    `;

    const [detalles] = await db.promise().query(query, [idCotizacion]);

    if (detalles.length > 0) {
      // Formatear los detalles para la respuesta
      const formattedDetails = detalles.map((item) => ({
        idProducto: item.ID_Producto,
        nombreProducto: item.NombreProducto,
        descripcion: item.Descripcion,
        cantidad: item.Cantidad,
        precioUnitario: item.Precio_Unitario,
        total: item.Cantidad * item.Precio_Unitario,
      }));

      // Datos adicionales de la cotización
      const cotizacionInfo = {
        idCotizacion: detalles[0].ID_Cotizacion,
        fechaCotizacion: detalles[0].Fecha_Cotizacion,
        estado: detalles[0].Estado,
        nombreVendedor: `${detalles[0].NombreVendedor} ${detalles[0].ApellidoVendedor}`,
      };

      res.json({ cotizacion: cotizacionInfo, productos: formattedDetails });
    } else {
      res.status(404).send("Cotización no encontrada");
    }
  } catch (error) {
    console.error("Error al obtener detalles de la cotización:", error);
    res.status(500).send("Error en el servidor");
  }
});

app.get("/api/productos-mas-cotizados/:idVendedor", async (req, res) => {
  const idVendedor = req.params.idVendedor;

  try {
    const query = `
          SELECT 
              p.Nombre, 
              SUM(d.Cantidad) as TotalCotizado
          FROM 
              detalle_venta d
          JOIN 
              producto p ON d.ID_Producto = p.ID_Producto
          JOIN 
              cotizacion c ON d.ID_Cotizacion = c.ID_Cotizacion
          WHERE 
              c.ID_Vendedor = ?
          GROUP BY 
              p.ID_Producto
          ORDER BY 
              TotalCotizado DESC
          LIMIT 5;
      `;

    const [productosMasCotizados] = await db
      .promise()
      .query(query, [idVendedor]);
    res.json(productosMasCotizados);
  } catch (error) {
    console.error("Error al obtener los productos más cotizados:", error);
    res.status(500).send("Error en el servidor");
  }
});

app.get("/api/ventas-diarias", async (req, res) => {
  try {
    const query = `
          SELECT SUM(d.Precio_Unitario * d.Cantidad) AS TotalVenta
          FROM cotizacion c
          JOIN detalle_venta d ON c.ID_Cotizacion = d.ID_Cotizacion
          WHERE DATE(c.Fecha_Cotizacion) = CURDATE();
      `;
    const [ventasDiarias] = await db.promise().query(query);
    res.json({ ventasDiarias: ventasDiarias[0].TotalVenta || 0 });
  } catch (error) {
    console.error("Error al obtener ventas diarias:", error);
    res.status(500).send("Error en el servidor");
  }
});

// API para obtener las ventas mensuales
app.get("/api/ventas-mensuales", async (req, res) => {
  try {
    const query = `
          SELECT SUM(d.Precio_Unitario * d.Cantidad) AS TotalVenta
          FROM cotizacion c
          JOIN detalle_venta d ON c.ID_Cotizacion = d.ID_Cotizacion
          WHERE MONTH(c.Fecha_Cotizacion) = MONTH(CURDATE())
          AND YEAR(c.Fecha_Cotizacion) = YEAR(CURDATE());
      `;
    const [ventasMensuales] = await db.promise().query(query);
    res.json({ ventasMensuales: ventasMensuales[0].TotalVenta || 0 });
  } catch (error) {
    console.error("Error al obtener ventas mensuales:", error);
    res.status(500).send("Error en el servidor");
  }
});

// API para obtener las ventas anuales
app.get("/api/ventas-anuales", async (req, res) => {
  try {
    const query = `
          SELECT SUM(d.Precio_Unitario * d.Cantidad) AS TotalVenta
          FROM cotizacion c
          JOIN detalle_venta d ON c.ID_Cotizacion = d.ID_Cotizacion
          WHERE YEAR(c.Fecha_Cotizacion) = YEAR(CURDATE());
      `;
    const [ventasAnuales] = await db.promise().query(query);
    res.json({ ventasAnuales: ventasAnuales[0].TotalVenta || 0 });
  } catch (error) {
    console.error("Error al obtener ventas anuales:", error);
    res.status(500).send("Error en el servidor");
  }
});

//crear usuario vendedor
// Puedes ajustar esto según las necesidades de seguridad

app.post("/api/registerVendedor", async (req, res) => {
  const {
    nombre,
    apellido,
    correoElectronico,
    telefono,
    idSucursal,
    areaEspecializacion,
    pass,
  } = req.body;

  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!regex.test(pass)) {
    return res.status(400).send('La contraseña no cumple con los requisitos.');
  }

  try {
    // Genera el hash de la contraseña
    const hashedPassword = await bcrypt.hash(pass, saltRounds);

    const query =
      "INSERT INTO vendedor (Nombre, Apellido, Correo_Electronico, Telefono, ID_Sucursal, Area_Especializacion, pass) VALUES (?, ?, ?, ?, ?, ?, ?)";

    db.query(
      query,
      [
        nombre,
        apellido,
        correoElectronico,
        telefono,
        idSucursal,
        areaEspecializacion,
        hashedPassword, // Usa la contraseña hasheada
      ],
      (err, results) => {
        if (err) {
          console.error("Error al insertar en la base de datos:", err);
          return res.status(500).send("Error al registrar el vendedor");
        }
        res.status(201).send("Vendedor registrado con éxito");
      }
    );
  } catch (err) {
    console.error("Error al hashear la contraseña:", err);
    return res.status(500).send("Error al procesar la solicitud");
  }
});


app.get("/api/sucursales", (req, res) => {
  const query = "SELECT * FROM sucursal";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error al consultar la base de datos:", err);
      return res.status(500).send("Error al obtener las sucursales");
    }
    res.json(results);
  });
});

app.get("/api/vendedores-admin", (req, res) => {
  const query = `
    SELECT 
      v.ID_Vendedor, 
      v.Nombre, 
      v.Apellido,
      v.Correo_Electronico,
      v.Telefono,
      v.ID_Sucursal,
      v.Area_Especializacion,
      v.pass,
      SUM(dv.Cantidad * dv.Precio_Unitario) AS TotalVentas
    FROM vendedor v
    LEFT JOIN cotizacion c ON v.ID_Vendedor = c.ID_Vendedor
    LEFT JOIN detalle_venta dv ON c.ID_Cotizacion = dv.ID_Cotizacion
    GROUP BY v.ID_Vendedor;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error al consultar la base de datos:", err);
      return res.status(500).send("Error al obtener los vendedores");
    }
    res.json(results);
  });
});

// Endpoint para actualizar un vendedor


app.put("/api/vendedores/:id", async (req, res) => {
  const { id } = req.params;
  const {
    Nombre,
    Apellido,
    Correo_Electronico,
    Telefono,
    ID_Sucursal,
    Area_Especializacion,
    pass,
    url_foto
  } = req.body;

  let hashedPass;
  if (pass) {
    try {
      // Si se proporciona una nueva contraseña, hashearla
      hashedPass = await bcrypt.hash(pass, saltRounds);
    } catch (err) {
      console.error("Error al hashear la contraseña:", err);
      return res.status(500).send("Error al procesar la solicitud");
    }
  }

  const query = `
    UPDATE vendedor 
    SET 
      Nombre = ?, 
      Apellido = ?, 
      Correo_Electronico = ?, 
      Telefono = ?, 
      ID_Sucursal = ?, 
      Area_Especializacion = ?, 
      pass = COALESCE(?, pass) ,
      url_foto = COALESCE(?, url_foto)
    WHERE ID_Vendedor = ?;
  `;

  db.query(
    query,
    [
      Nombre,
      Apellido,
      Correo_Electronico,
      Telefono,
      ID_Sucursal,
      Area_Especializacion,
      hashedPass, // Usar la contraseña hasheada
      url_foto,
      id,
    ],
    (err, result) => {
      if (err) {
        console.error("Error al actualizar el vendedor:", err);
        return res.status(500).send("Error al actualizar el vendedor");
      }
      res.status(200).send("Vendedor actualizado con éxito");
    }
  );
});


app.delete("/api/vendedoresD/:id", async (req, res) => {
  const { id } = req.params;
  const { adminPassword } = req.body; // Recibir la contraseña del administrador

  // Verificar la contraseña del administrador
  const adminQuery =
    "SELECT pass FROM administrador WHERE ID_Administrador = 1"; // Ajustar según sea necesario
  const [admin] = await db.promise().query(adminQuery);

  if (admin[0].pass !== adminPassword) {
    return res.status(401).send("Contraseña de administrador incorrecta");
  }

  const deleteQuery = "DELETE FROM vendedor WHERE ID_Vendedor = ?";

  db.query(deleteQuery, [id], (err, result) => {
    if (err) {
      console.error("Error al eliminar el vendedor:", err);
      return res.status(500).send("Error al eliminar el vendedor");
    }
    if (result.affectedRows === 0) {
      return res.status(404).send("Vendedor no encontrado");
    }
    res.status(200).send("Vendedor eliminado con éxito");
  });
});

// Endpoint para obtener todas las categorías
app.get("/api/categorias", async (req, res) => {
  const query = "SELECT * FROM categoria_producto";
  try {
    const [categorias] = await db.promise().query(query);
    res.json(categorias);
  } catch (error) {
    res.status(500).send("Error al obtener categorías");
  }
});

// Endpoint para crear una nueva categoría
app.post("/api/categorias", async (req, res) => {
  const { Nombre, Descripcion } = req.body;
  const query =
    "INSERT INTO categoria_producto (Nombre, Descripcion) VALUES (?, ?)";
  try {
    await db.promise().query(query, [Nombre, Descripcion]);
    res.status(201).send("Categoría creada con éxito");
  } catch (error) {
    res.status(500).send("Error al crear categoría");
  }
});

// Endpoint para actualizar una categoría existente
app.put("/api/categorias/:id", async (req, res) => {
  const { id } = req.params;
  const { Nombre, Descripcion } = req.body;
  const query =
    "UPDATE categoria_producto SET Nombre = ?, Descripcion = ? WHERE ID_Categoria = ?";
  try {
    await db.promise().query(query, [Nombre, Descripcion, id]);
    res.status(200).send("Categoría actualizada con éxito");
  } catch (error) {
    res.status(500).send("Error al actualizar categoría");
  }
});

// Endpoint para eliminar una categoría
app.delete("/api/categorias/:id", async (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM categoria_producto WHERE ID_Categoria = ?";

  try {
    const [result] = await db.promise().query(query, [id]);
    if (result.affectedRows === 0) {
      return res.status(404).send("Categoría no encontrada");
    }
    res.status(200).send("Categoría eliminada con éxito");
  } catch (error) {
    console.error("Error al eliminar categoría:", error);
    res.status(500).send("Error al eliminar categoría");
  }
});

app.get("/api/ventas-por-vendedor/:anio", async (req, res) => {
  const anio = req.params.anio;

  try {
    const [ventas] = await db.promise().query(
      `
      SELECT v.ID_Vendedor, v.Nombre, MONTH(c.Fecha_Cotizacion) as Mes, SUM(dv.Cantidad * dv.Precio_Unitario) as TotalVentas
      FROM detalle_venta dv
      JOIN cotizacion c ON dv.ID_Cotizacion = c.ID_Cotizacion
      JOIN vendedor v ON dv.ID_Vendedor = v.ID_Vendedor
      WHERE YEAR(c.Fecha_Cotizacion) = ?
      GROUP BY v.ID_Vendedor, MONTH(c.Fecha_Cotizacion)
      ORDER BY v.ID_Vendedor, Mes
    `,
      [anio]
    );

    res.json(ventas);
  } catch (error) {
    console.error("Error al obtener ventas por vendedor:", error);
    res.status(500).send("Error al obtener ventas por vendedor");
  }
});

app.get("/api/LCotizaciones", async (req, res) => {
  try {
    const query = `
      SELECT 
        c.ID_Cotizacion, 
        c.Fecha_Cotizacion, 
        c.Estado, 
        v.ID_Vendedor, 
        v.Nombre as NombreVendedor, 
        v.Apellido as ApellidoVendedor
      FROM 
        cotizacion c
      LEFT JOIN 
        vendedor v ON c.ID_Vendedor = v.ID_Vendedor;
    `;
    const [cotizaciones] = await db.promise().query(query);
    res.json(cotizaciones);
  } catch (error) {
    console.error("Error al obtener las cotizaciones:", error);
    res.status(500).send("Error en el servidor");
  }
});

// Obtener todos los productos
app.get("/api/products", (req, res) => {
  const query = "SELECT * FROM producto";
  db.query(query, (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(results);
  });
});

// Eliminar un producto
app.delete("/api/products/:id", (req, res) => {
  const query = "DELETE FROM producto WHERE ID_Producto = ?";
  db.query(query, [req.params.id], (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.status(204).send();
  });
});

app.post("/api/pagarCotizacion", (req, res) => {
  const { idCotizacion, totalCotizacion, metodoPago } = req.body; // Utiliza el totalCotizacion

  console.log("idCotizacion:", idCotizacion);
  console.log("metodoPago:", metodoPago);

  console.log("idCotizacion:", idCotizacion);
  //console.log("montoPagado:", montoPagado); // Asegúrate de que se imprima este valor
  console.log("metodoPago:", metodoPago);

  db.beginTransaction((err) => {
    if (err) {
      return res.status(500).send("Error al iniciar transacción");
    }

    const cotizacionQuery = "SELECT * FROM cotizacion WHERE ID_Cotizacion = ?";
    db.query(cotizacionQuery, [idCotizacion], (err, cotizaciones) => {
      if (err) {
        db.rollback(() => {
          console.error("Error al buscar la cotización:", err);
          return res.status(500).send("Error en el servidor");
        });
      }

      if (cotizaciones.length === 0) {
        db.rollback(() => {
          return res.status(404).send("Cotización no encontrada");
        });
      }

      const cotizacion = cotizaciones[0];

      const sucursalQuery =
        "SELECT ID_Sucursal FROM vendedor WHERE ID_Vendedor = ?";
      db.query(sucursalQuery, [cotizacion.ID_Vendedor], (err, sucursales) => {
        if (err || sucursales.length === 0) {
          db.rollback(() => {
            console.error("Error al obtener la sucursal:", err);
            return res
              .status(500)
              .send("Error en el servidor al obtener la sucursal");
          });
        }

        const idSucursal = sucursales[0].ID_Sucursal;

        const detallesCotizacionQuery =
          "SELECT * FROM detalle_venta WHERE ID_Cotizacion = ?";
        db.query(detallesCotizacionQuery, [idCotizacion], (err, detalles) => {
          if (err) {
            db.rollback(() => {
              console.error("Error al obtener detalles de la cotización:", err);
              return res.status(500).send("Error en el servidor");
            });
          }

          const fechaActual = new Date().toISOString().slice(0, 10);
          const insertTransaccion =
            "INSERT INTO transaccion (ID_Cliente, Fecha, Total, ID_Sucursal, Metodo_Pago, ID_Cotizacion) VALUES (?, ?, ?, ?, ?, ?)";
          db.query(
            insertTransaccion,
            [
              cotizacion.ID_Cliente,
              fechaActual,
              totalCotizacion,
              idSucursal,
              metodoPago,
              idCotizacion,
            ],
            (err, result) => {
              if (err) {
                db.rollback(() => {
                  console.error("Error al crear la transacción:", err);
                  return res.status(500).send("Error al crear la transacción");
                });
              }

              const idTransaccion = result.insertId;

              const updateCotizacion =
                'UPDATE cotizacion SET Estado = "Pagado" WHERE ID_Cotizacion = ?';
              db.query(updateCotizacion, [idCotizacion], (err) => {
                if (err) {
                  db.rollback(() => {
                    console.error(
                      "Error al actualizar el estado de la cotización:",
                      err
                    );
                    return res
                      .status(500)
                      .send("Error al actualizar el estado de la cotización");
                  });
                } else {
                  actualizarDetallesYStock(detalles, idTransaccion, res, db);
                }
              });
            }
          );
        });
      });
    });
  });
});

function actualizarDetallesYStock(detalles, idTransaccion, res, db) {
  let queriesCompletadas = 0;

  detalles.forEach((detalle) => {
    const updateDetalleVenta =
      "UPDATE detalle_venta SET ID_Transaccion = ? WHERE ID_DetalleVenta = ?";
    db.query(
      updateDetalleVenta,
      [idTransaccion, detalle.ID_DetalleVenta],
      (err) => {
        if (err) {
          db.rollback(() => {
            console.error("Error al actualizar detalle de venta:", err);
            return res.status(500).send("Error al actualizar detalle de venta");
          });
        }

        const reduceStockQuery =
          "UPDATE producto SET Stock = Stock - ? WHERE ID_Producto = ?";
        db.query(
          reduceStockQuery,
          [detalle.Cantidad, detalle.ID_Producto],
          (err) => {
            if (err) {
              db.rollback(() => {
                console.error("Error al reducir el stock del producto:", err);
                return res
                  .status(500)
                  .send("Error al reducir el stock del producto");
              });
            }

            queriesCompletadas++;
            if (queriesCompletadas === detalles.length) {
              db.commit((err) => {
                if (err) {
                  db.rollback(() => {
                    console.error(
                      "Error al realizar commit de transacción:",
                      err
                    );
                    return res
                      .status(500)
                      .send("Error al realizar commit de transacción");
                  });
                } else {
                  res
                    .status(200)
                    .send(
                      "Pago y actualización de detalles completados con éxito"
                    );
                }
              });
            }
          }
        );
      }
    );
  });
}

app.get("/api/ventas-globales", async (req, res) => {
  try {
    const [ventas] = await db.promise().query(`
            SELECT YEAR(Fecha) as year, SUM(Precio_Unitario * Cantidad) as totalSales
            FROM detalle_venta
            JOIN transaccion ON detalle_venta.ID_Transaccion = transaccion.ID_Transaccion
            WHERE Fecha >= NOW() - INTERVAL 5 YEAR
            GROUP BY YEAR(Fecha)
            ORDER BY YEAR(Fecha)
        `);
    res.json(ventas);
  } catch (error) {
    console.error("Error al obtener ventas globales:", error);
    res.status(500).send("Error al obtener ventas globales");
  }
});

app.get("/api/ventas-anuales2", async (req, res) => {
  try {
    const [ventasAnuales] = await db.promise().query(`
          SELECT YEAR(Fecha) as year, SUM(Precio_Unitario * Cantidad) as totalSales
          FROM detalle_venta
          JOIN transaccion ON detalle_venta.ID_Transaccion = transaccion.ID_Transaccion
          WHERE Fecha >= NOW() - INTERVAL 5 YEAR
          GROUP BY YEAR(Fecha)
          ORDER BY YEAR(Fecha)
      `);
    res.json(ventasAnuales);
  } catch (error) {
    console.error("Error al obtener ventas anuales:", error);
    res.status(500).send("Error al obtener ventas anuales");
  }
});

app.get("/api/ventas-mensuales2", async (req, res) => {
  const year = new Date().getFullYear();
  try {
    const [ventasMensuales] = await db.promise().query(
      `
          SELECT MONTH(Fecha) as month, SUM(Precio_Unitario * Cantidad) as totalSales
          FROM detalle_venta
          JOIN transaccion ON detalle_venta.ID_Transaccion = transaccion.ID_Transaccion
          WHERE YEAR(Fecha) = ?
          GROUP BY MONTH(Fecha)
      `,
      [year]
    );
    res.json(ventasMensuales);
  } catch (error) {
    console.error("Error al obtener ventas mensuales:", error);
    res.status(500).send("Error al obtener ventas mensuales");
  }
});

app.get("/api/top-productos", async (req, res) => {
  try {
    const [topProductos] = await db.promise().query(`
          SELECT producto.Nombre, SUM(Cantidad) as totalVendido
          FROM detalle_venta
          JOIN producto ON detalle_venta.ID_Producto = producto.ID_Producto
          JOIN transaccion ON detalle_venta.ID_Transaccion = transaccion.ID_Transaccion
          GROUP BY detalle_venta.ID_Producto
          ORDER BY totalVendido DESC
          LIMIT 10
      `);
    res.json(topProductos);
  } catch (error) {
    console.error("Error al obtener top de productos:", error);
    res.status(500).send("Error al obtener top de productos");
  }
});

app.get("/api/ventas-por-sucursal", async (req, res) => {
  try {
    const [ventas] = await db.promise().query(`
      SELECT sucursal.Ubicacion as Sucursal, SUM(transaccion.Total) as TotalVentas
      FROM transaccion
      JOIN sucursal ON transaccion.ID_Sucursal = sucursal.ID_Sucursal
      GROUP BY sucursal.Ubicacion
      `);
    res.json(ventas);
  } catch (error) {
    console.error("Error al obtener ventas por sucursal:", error);
    res.status(500).send("Error al obtener ventas por sucursal");
  }
});
