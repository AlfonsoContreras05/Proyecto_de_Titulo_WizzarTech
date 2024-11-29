-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-12-2023 a las 20:43:33
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sistemacotizaciones`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administrador`
--

CREATE TABLE `administrador` (
  `ID_Administrador` int(11) NOT NULL,
  `Nombre` varchar(255) DEFAULT NULL,
  `Apellido` varchar(255) DEFAULT NULL,
  `Correo_Electronico` varchar(255) DEFAULT NULL,
  `Telefono` varchar(50) DEFAULT NULL,
  `Rol` varchar(50) DEFAULT NULL,
  `pass` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `administrador`
--

INSERT INTO `administrador` (`ID_Administrador`, `Nombre`, `Apellido`, `Correo_Electronico`, `Telefono`, `Rol`, `pass`) VALUES
(1, 'Wizzard', 'Tech', 'WT@gmail.com', '+56 9 4631 7762', 'Admin', '123456');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `almacenamiento`
--

CREATE TABLE `almacenamiento` (
  `ID_Almacenamiento` int(11) NOT NULL,
  `ID_Producto` int(11) DEFAULT NULL,
  `Nombre` varchar(255) DEFAULT NULL,
  `Capacidad` varchar(20) DEFAULT NULL,
  `Tipo` varchar(50) DEFAULT NULL,
  `FactorForma` varchar(50) DEFAULT NULL,
  `Interfaz` varchar(50) DEFAULT NULL,
  `Fabricante` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `almacenamiento`
--

INSERT INTO `almacenamiento` (`ID_Almacenamiento`, `ID_Producto`, `Nombre`, `Capacidad`, `Tipo`, `FactorForma`, `Interfaz`, `Fabricante`) VALUES
(1, NULL, 'Elemento 1', NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria_producto`
--

CREATE TABLE `categoria_producto` (
  `ID_Categoria` int(11) NOT NULL,
  `Nombre` varchar(255) DEFAULT NULL,
  `Descripcion` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categoria_producto`
--

INSERT INTO `categoria_producto` (`ID_Categoria`, `Nombre`, `Descripcion`) VALUES
(1, 'Placas Madre', 'Placas base para ensamblar componentes de computadora'),
(2, 'Procesadores', 'Unidades centrales de procesamiento para computadoras'),
(3, 'Tarjetas Gráficas', 'Componentes para procesamiento gráfico y rendimiento visual'),
(4, 'Fuentes de Poder', 'Suministro de energía para componentes de computadora'),
(5, 'Almacenamiento', 'Componentes de almacenamiento de hadware'),
(6, 'Cooler', 'Componentes de Enfriamiento'),
(7, 'Memoria Ram', 'Componentes '),
(8, 'Gabinete', 'Componente estructural');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `ID_Cliente` int(11) NOT NULL,
  `Nombre` varchar(255) DEFAULT NULL,
  `Apellido` varchar(255) DEFAULT NULL,
  `rut` varchar(13) NOT NULL,
  `Direccion` varchar(255) DEFAULT NULL,
  `Correo_Electronico` varchar(255) DEFAULT NULL,
  `Telefono` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cooler`
--

CREATE TABLE `cooler` (
  `ID_Cooler` int(11) NOT NULL,
  `ID_Producto` int(11) DEFAULT NULL,
  `Nombre` varchar(255) DEFAULT NULL,
  `RPM` int(11) DEFAULT NULL,
  `NivelRuido` decimal(10,2) DEFAULT NULL,
  `TamañoRadiador` varchar(20) DEFAULT NULL,
  `zocaloCpu` varchar(50) DEFAULT NULL,
  `Fabricante` varchar(100) DEFAULT NULL,
  `ImagenURL` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cooler`
--

INSERT INTO `cooler` (`ID_Cooler`, `ID_Producto`, `Nombre`, `RPM`, `NivelRuido`, `TamañoRadiador`, `zocaloCpu`, `Fabricante`, `ImagenURL`) VALUES
(1, NULL, 'Elemento 1', NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cotizacion`
--

CREATE TABLE `cotizacion` (
  `ID_Cotizacion` int(11) NOT NULL,
  `ID_Cliente` int(11) NOT NULL,
  `ID_Vendedor` int(11) DEFAULT NULL,
  `Fecha_Cotizacion` date NOT NULL,
  `Estado` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_venta`
--

CREATE TABLE `detalle_venta` (
  `ID_DetalleVenta` int(11) NOT NULL,
  `ID_Transaccion` int(11) DEFAULT NULL,
  `ID_Producto` int(11) DEFAULT NULL,
  `Cantidad` int(11) DEFAULT NULL,
  `Precio_Unitario` int(10) DEFAULT NULL,
  `Descuento` decimal(10,2) DEFAULT NULL,
  `ID_Vendedor` int(11) DEFAULT NULL,
  `ID_Cotizacion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fuentepoder`
--

CREATE TABLE `fuentepoder` (
  `ID_FuentePoder` int(11) NOT NULL,
  `ID_Producto` int(11) DEFAULT NULL,
  `TipoFuente` varchar(15) DEFAULT NULL,
  `PotenciaW` varchar(10) DEFAULT NULL,
  `Tipo` varchar(30) DEFAULT NULL,
  `Eficiencia` varchar(15) DEFAULT NULL,
  `ImagenURL` varchar(255) DEFAULT NULL,
  `Nombre` varchar(100) DEFAULT NULL,
  `Fabricante` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `fuentepoder`
--

INSERT INTO `fuentepoder` (`ID_FuentePoder`, `ID_Producto`, `TipoFuente`, `PotenciaW`, `Tipo`, `Eficiencia`, `ImagenURL`, `Nombre`, `Fabricante`) VALUES
(1, 10, 'Corsair', '750W', NULL, '80 Plus Gold', 'url_imagen_10', NULL, NULL),
(2, 11, 'EVGA', '600W', NULL, '80 Plus Bronze', 'url_imagen_11', NULL, NULL),
(3, 12, 'Thermaltake', '500W', NULL, '80 Plus White', 'url_imagen_12', NULL, NULL),
(4, 67, 'ATX', '750 W', 'Full', '80+ Gold', '51', 'Corsair RM750e (2023)', 'Corsair'),
(5, 68, 'ATX', '1000 W', 'Full', '80+ Gold', '52', 'Corsair RM850e (2023)', 'Corsair'),
(6, 69, 'SFX', '750 W', 'Full', '80+ Platinum', '53', 'Corsair SF750', 'Corsair'),
(7, 70, 'ATX', '750 W', 'Full', '80+ Gold', '54', 'Gigabyte UD750GM', 'Gigabyte'),
(8, 71, 'SFX', '850 W', 'Full', '80+ Gold', '55', 'Cooler Master V850 SFX GOLD', 'Cooler Master'),
(9, 72, 'ATX', '650 W', 'No', '80+ Bronze', '56', 'MSI MAG A650BN', 'MSI'),
(10, 73, 'ATX', '1000 W', 'Full', '80+ Gold', '57', 'MSI A1000G PCIE5', 'MSI'),
(11, 74, 'ATX', '400 W', 'No', '75% Typical', '58', 'EVGA 400 N1', 'EVGA'),
(12, 75, 'SFX', '850 W', 'Full', '80+ Gold', '59', 'Lian Li SP850', 'Lian Li'),
(13, 76, 'ATX', '1200 W', 'Full', '80+ Platinum', '60', 'Asus ROG THOR P2 Gaming', 'Asus');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gabinete`
--

CREATE TABLE `gabinete` (
  `ID_Gabinete` int(11) NOT NULL,
  `ID_Producto` int(11) DEFAULT NULL,
  `Nombre` varchar(255) DEFAULT NULL,
  `Tipo` varchar(50) DEFAULT NULL,
  `Color` varchar(50) DEFAULT NULL,
  `Volumen` int(11) DEFAULT NULL,
  `PanelLateral` varchar(50) DEFAULT NULL,
  `Fabricante` varchar(100) DEFAULT NULL,
  `ImagenURL` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `gabinete`
--

INSERT INTO `gabinete` (`ID_Gabinete`, `ID_Producto`, `Nombre`, `Tipo`, `Color`, `Volumen`, `PanelLateral`, `Fabricante`, `ImagenURL`) VALUES
(1, 57, 'Corsair 4000D Airflow', 'Torre media ATX', 'Negro', 49, 'Vidrio templado tintado', 'Corsair', '41'),
(2, 58, 'Lian Li O11 Dynamic EVO', 'Torre media ATX', 'Blanco / Gris', 61, 'Vidrio templado', 'Lian Li', '42'),
(3, 59, 'Cooler Master MasterBox Q300L', 'Minitorre MicroATX', 'Negro', 34, 'Acrílico', 'Cooler Master', '43'),
(4, 60, 'Silverstone ALTA F2', 'Torre Completa ATX', 'Negro', 99, 'Vidrio templado', 'Silverstone', '44'),
(5, 61, 'Fractal Design Pop Mini Air', 'Media torre MicroATX', 'Negro', 37, 'Vidrio templado', 'Fractal Design', '45'),
(6, 62, 'Corsair 7000D AIRFLOW', 'Torre Completa ATX', 'Negro', 82, 'Vidrio templado', 'Corsair', '46'),
(7, 63, 'Phanteks Eclipse G360A', 'Torre media ATX', 'Negro', 42, 'Vidrio templado', 'Phanteks', '47'),
(8, 64, 'Cooler Master MasterBox NR200P', 'Escritorio Mini ITX', 'Negro', 20, 'Vidrio templado', 'Cooler Master', '48'),
(9, 65, 'NZXT H5 Flow RGB', 'Torre media ATX', 'Blanco', 47, 'Vidrio templado', 'NZXT', '49'),
(10, 66, 'HYTE Y70 Touch', 'Torre media ATX', 'Blanco', 71, 'Vidrio templado', 'HYTE', '50');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imagenes`
--

CREATE TABLE `imagenes` (
  `ID_Imagen` int(11) NOT NULL,
  `ID_Producto` int(11) NOT NULL,
  `URL` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `imagenes`
--

INSERT INTO `imagenes` (`ID_Imagen`, `ID_Producto`, `URL`) VALUES
(2, 17, 'img-productos\\tarjetagrafica\\1.jpg'),
(3, 18, 'img-productos\\tarjetagrafica\\2.jpg'),
(4, 9, 'img-productos\\tarjetagrafica\\3.jpg'),
(5, 20, 'img-productos\\tarjetagrafica\\4.jpg'),
(6, 21, 'img-productos\\tarjetagrafica\\5.jpg'),
(7, 22, 'img-productos\\tarjetagrafica\\6.jpg'),
(8, 23, 'img-productos\\tarjetagrafica\\7.jpg'),
(9, 24, 'img-productos\\tarjetagrafica\\8.jpg'),
(10, 25, 'img-productos\\tarjetagrafica\\9.jpg'),
(11, 26, 'img-productos\\tarjetagrafica\\10.jpg'),
(12, 27, 'img-productos\\procesador\\11.jpg'),
(13, 28, 'img-productos\\procesador\\12.jpg'),
(14, 29, 'img-productos\\procesador\\13.jpg'),
(15, 30, 'img-productos\\procesador\\14.jpg'),
(16, 31, 'img-productos\\procesador\\15.jpg'),
(17, 32, 'img-productos\\procesador\\16.jpg'),
(18, 33, 'img-productos\\procesador\\17.jpg'),
(19, 34, 'img-productos\\procesador\\18.jpg'),
(20, 35, 'img-productos\\procesador\\19.jpg'),
(21, 36, 'img-productos\\procesador\\20.jpg'),
(22, 37, 'img-productos\\placamadre\\21.jpg'),
(23, 38, 'img-productos\\placamadre\\22.jpg'),
(24, 39, 'img-productos\\placamadre\\23.jpg'),
(25, 40, 'img-productos\\placamadre\\24.jpg'),
(26, 41, 'img-productos\\placamadre\\25.jpg'),
(27, 42, 'img-productos\\placamadre\\26.jpg'),
(28, 43, 'img-productos\\placamadre\\27.jpg'),
(29, 44, 'img-productos\\placamadre\\28.jpg'),
(30, 45, 'img-productos\\placamadre\\29.jpg'),
(31, 46, 'img-productos\\placamadre\\30.jpg'),
(32, 47, 'img-productos\\memoriaram\\31.jpg'),
(33, 48, 'img-productos\\memoriaram\\32.jpg'),
(34, 49, 'img-productos\\memoriaram\\33.jpg'),
(35, 50, 'img-productos\\memoriaram\\34.jpg'),
(36, 51, 'img-productos\\memoriaram\\35.jpg'),
(37, 52, 'img-productos\\memoriaram\\36.jpg'),
(38, 53, 'img-productos\\memoriaram\\37.jpg'),
(39, 54, 'img-productos\\memoriaram\\38.jpg'),
(40, 55, 'img-productos\\memoriaram\\39.jpg'),
(41, 56, 'img-productos\\memoriaram\\40.jpg'),
(42, 57, 'img-productos\\gabinete\\41.jpg'),
(43, 58, 'img-productos\\gabinete\\42.jpg'),
(44, 59, 'img-productos\\gabinete\\43.jpg'),
(45, 60, 'img-productos\\gabinete\\44.jpg'),
(46, 61, 'img-productos\\gabinete\\45.jpg'),
(47, 62, 'img-productos\\gabinete\\46.jpg'),
(48, 63, 'img-productos\\gabinete\\47.jpg'),
(49, 64, 'img-productos\\gabinete\\48.jpg'),
(50, 65, 'img-productos\\gabinete\\49.jpg'),
(51, 66, 'img-productos\\gabinete\\50.jpg'),
(52, 67, 'img-productos\\fuentepoder\\51.jpg'),
(53, 68, 'img-productos\\fuentepoder\\52.jpg'),
(54, 69, 'img-productos\\fuentepoder\\53.jpg'),
(55, 70, 'img-productos\\fuentepoder\\54.jpg'),
(56, 71, 'img-productos\\fuentepoder\\55.jpg'),
(57, 72, 'img-productos\\fuentepoder\\56.jpg'),
(58, 73, 'img-productos\\fuentepoder\\57.jpg'),
(59, 74, 'img-productos\\fuentepoder\\58.jpg'),
(60, 75, 'img-productos\\fuentepoder\\59.jpg'),
(61, 76, 'img-productos\\fuentepoder\\60.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `memoriaram`
--

CREATE TABLE `memoriaram` (
  `ID_Ram` int(11) NOT NULL,
  `ID_Producto` int(11) DEFAULT NULL,
  `Nombre` varchar(255) DEFAULT NULL,
  `Conector` varchar(50) DEFAULT NULL,
  `Velocidad` varchar(20) DEFAULT NULL,
  `Modulos` int(11) DEFAULT NULL,
  `Fabricante` varchar(100) DEFAULT NULL,
  `ImagenURL` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `memoriaram`
--

INSERT INTO `memoriaram` (`ID_Ram`, `ID_Producto`, `Nombre`, `Conector`, `Velocidad`, `Modulos`, `Fabricante`, `ImagenURL`) VALUES
(1, 47, 'Corsair Vengeance LPX 16GB', 'DDR5', '3200 MHz', 2, 'Corsair', '31'),
(2, 48, 'G.Skill Tridente Z5 RGB 32 GB', 'DDR5', '6000 MHz', 2, 'G.Skill', '32'),
(3, 49, 'G.Skill Tridente Z5 RGB 64 GB', 'DDR5', '6400 MHz', 2, 'G.Skill', '33'),
(4, 50, 'Corsair Venganza RGB 128 GB', 'DDR5', '5600 MHz', 4, 'Corsair', '34'),
(5, 51, 'TEAMGROUP T-Force Delta RGB 32 GB', 'DDR5', '6000 MHz', 2, 'TEAMGROUP', '35'),
(6, 52, 'Silicon Power GAMING 16 GB', 'DDR4', '3200 MHz', 2, 'Silicon Power', '36'),
(7, 53, 'Crucial Pro 32 GB', 'DDR5', '5600 MHz', 2, 'Crucial', '37'),
(8, 54, 'Kingston FURY Beast 16 GB', 'DDR4', '3200 MHz', 2, 'Kingston', '38'),
(9, 55, 'Corsair Dominator Platinum RGB 32 GB', 'DDR5', '6200 MHz', 2, 'Corsair', '39'),
(10, 56, 'ADATA XPG Lancer Blade 32 GB', 'DDR5', '6000 MHz', 2, 'ADATA', '40');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido`
--

CREATE TABLE `pedido` (
  `ID_Pedido` int(11) NOT NULL,
  `ID_Cliente` int(11) DEFAULT NULL,
  `Fecha_Pedido` date DEFAULT NULL,
  `Fecha_Estimada_Entrega` date DEFAULT NULL,
  `Estado` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `placamadre`
--

CREATE TABLE `placamadre` (
  `ID_PlacaMadre` int(11) NOT NULL,
  `ID_Producto` int(11) DEFAULT NULL,
  `ArkPlaca` varchar(20) NOT NULL,
  `Zocalo/CPU` varchar(20) DEFAULT NULL,
  `FactorForma` varchar(20) DEFAULT NULL,
  `MaxMemoria` varchar(20) DEFAULT NULL,
  `RanurasMemoria` int(11) DEFAULT NULL,
  `SoporteDDR` varchar(10) DEFAULT NULL,
  `ImagenURL` varchar(255) DEFAULT NULL,
  `Nombre` varchar(100) DEFAULT NULL,
  `Fabricante` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `placamadre`
--

INSERT INTO `placamadre` (`ID_PlacaMadre`, `ID_Producto`, `ArkPlaca`, `Zocalo/CPU`, `FactorForma`, `MaxMemoria`, `RanurasMemoria`, `SoporteDDR`, `ImagenURL`, `Nombre`, `Fabricante`) VALUES
(11, 1, 'Z490', NULL, NULL, NULL, NULL, 'DDR4', '/img-productos/imagen1.jpg', NULL, NULL),
(12, 2, 'B550', NULL, NULL, NULL, NULL, 'DDR4', 'url_imagen_2', NULL, NULL),
(13, 3, 'X570', NULL, NULL, NULL, NULL, 'DDR4', 'url_imagen_3', NULL, NULL),
(14, 37, 'AMD B550', 'AM4', 'ATX', '128GB', 4, 'DDR4', '21', 'MSI B550 GAMING GEN3', 'MSI'),
(15, 38, 'AMD B650', 'AM5', 'ATX', '192 GB', 4, 'DDR5', '22', 'Gigabyte B650 AORUS ELITE AX', 'Gigabyte'),
(16, 39, 'Intel Z790', 'LGA1700', 'ATX', '192GB', 4, 'DDR5', '23', 'Gigabyte Z790 AORUS ELITE AX', 'Gigabyte'),
(17, 40, 'AMD B650', 'AM5', 'Micro ATX', '192 GB', 4, 'DDR5', '24', 'ASRock B650M Pro RS WiFi', 'ASRock'),
(18, 41, 'Intel B760', 'LGA1700', 'Mini ITX', '96 GB', 2, 'DDR5', '25', 'Asus ROG STRIX B760-I GAMING WIFI', 'Asus'),
(19, 42, 'AMD TRX40', 'TRX4', 'EATX', '256GB', 8, 'DDR4', '26', 'Asus ROG ZENITH II EXTREME ALPHA', 'Asus'),
(20, 43, 'AMD B550', 'AM4', 'Micro ATX', '128GB', 4, 'DDR4', '27', 'MSI PRO B550M-VC WIFI', 'MSI'),
(21, 44, 'AMD B650', 'AM5', 'Mini ITX', '96GB', 2, 'DDR5', '28', 'Gigabyte B650I AORUS ULTRA', 'Gigabyte'),
(22, 45, 'Intel B760', 'LGA1700', 'ATX', '128GB', 4, 'DDR4', '29', 'MSI PRO B760-P WIFI DDR4', 'MSI'),
(23, 46, 'Intel Z690', 'LGA1700', 'ATX', '192GB', 4, 'DDR5', '30', 'Asus TUF GAMING Z690-PLUS WIFI', 'Asus');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `procesador`
--

CREATE TABLE `procesador` (
  `ID_Procesador` int(11) NOT NULL,
  `ID_Producto` int(11) DEFAULT NULL,
  `ArkProcesador` varchar(20) DEFAULT NULL,
  `Frecuencia` varchar(15) NOT NULL,
  `Nucleos` int(11) DEFAULT NULL,
  `PotenciaW` varchar(10) DEFAULT NULL,
  `Socket` varchar(20) DEFAULT NULL,
  `ImagenURL` varchar(255) DEFAULT NULL,
  `Nombre` varchar(100) DEFAULT NULL,
  `Fabricante` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `procesador`
--

INSERT INTO `procesador` (`ID_Procesador`, `ID_Producto`, `ArkProcesador`, `Frecuencia`, `Nucleos`, `PotenciaW`, `Socket`, `ImagenURL`, `Nombre`, `Fabricante`) VALUES
(1, 4, 'Intel Core i9', '3.7 GHz', NULL, NULL, NULL, 'url_imagen_4', NULL, NULL),
(2, 5, 'AMD Ryzen 7', '3.8 GHz', NULL, NULL, NULL, 'url_imagen_5', NULL, NULL),
(3, 6, 'Intel Core i5', '2.9 GHz', NULL, NULL, NULL, 'url_imagen_6', NULL, NULL),
(4, 27, 'Zen 4', '4.2 GHz', 8, '120W', 'AM5', '11', 'AMD Ryzen 7 7800X3D', 'AMD'),
(5, 28, 'Zen 3', '3.7 GHz', 6, '65W', 'AM4', '12', 'AMD Ryzen 5 5600X', 'AMD'),
(6, 29, 'Raptor Lake', '3.4 GHz', 16, '125W', 'LGA1700', '13', 'Intel Core i7-13700K', 'Intel'),
(7, 30, 'Raptor Lake Refresh', '3.2 GHz', 24, '125W', 'LGA1700', '14', 'Intel Core i9-14900K', 'Intel'),
(8, 31, 'Raptor Lake', '3.5 GHz', 14, '125W', 'LGA1700', '15', 'Intel Core i5-13600K', 'Intel'),
(9, 32, 'Zen 4', '4.2 GHz', 16, '120W', 'AM5', '16', 'AMD Ryzen 9 7950X3D', 'AMD'),
(10, 33, 'Alder Lake', '3.3 GHz', 4, '58W', 'LGA1700', '17', 'Intel Core i3-12100F', 'Intel'),
(11, 34, 'Zen 2', '2.9 GHz', 64, '280W', 'sTRX4', '18', 'AMD Threadripper 3990X', 'AMD'),
(12, 35, 'Coffee Lake Refresh', '2.9 GHz', 6, '65W', 'LGA1151', '19', 'Intel Core i5-9400F', 'Intel'),
(13, 36, 'Zen 2', '3.7 GHz', 32, '280W', 'sTRX4', '20', 'AMD Threadripper 3970X', 'AMD');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `ID_Producto` int(11) NOT NULL,
  `Nombre` varchar(255) DEFAULT NULL,
  `Descripcion` text DEFAULT NULL,
  `Precio` int(10) DEFAULT NULL,
  `ID_Categoria` int(11) DEFAULT NULL,
  `Stock` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`ID_Producto`, `Nombre`, `Descripcion`, `Precio`, `ID_Categoria`, `Stock`) VALUES
(1, 'Placa Madre Z490', 'Placa Madre para procesadores Intel con socket Z490, soporte DDR4', 120, 1, 14),
(2, 'Placa Madre B550', 'Placa Madre para procesadores AMD con socket B550, soporte DDR4', 100, 1, 2),
(3, 'Placa Madre X570', 'Placa Madre de alto rendimiento para AMD, socket X570, soporte DDR4', 180, 1, 8),
(4, 'Intel Core i9', 'Procesador Intel Core i9, 10a generación, 3.7 GHz', 450, 2, 7),
(5, 'AMD Ryzen 7', 'Procesador AMD Ryzen 7, 3.8 GHz, 8 núcleos', 330, 2, 7),
(6, 'Intel Core i5', 'Procesador Intel Core i5, 10a generación, 2.9 GHz', 250, 2, 19),
(9, 'NVIDIA GTX 1660', 'Tarjeta gráfica NVIDIA GTX 1660, 6GB GDDR5', 300, 3, 12),
(10, 'Corsair 750W', 'Fuente de poder Corsair, 750W, certificación 80 Plus Gold', 90, 4, 14),
(11, 'EVGA 600W', 'Fuente de poder EVGA, 600W, certificación 80 Plus Bronze', 60, 4, 15),
(12, 'Thermaltake 500W', 'Fuente de poder Thermaltake, 500W, certificación 80 Plus White', 45, 4, 28),
(17, 'MSI GeForce RTX 3060 Ventus 2X 12G', 'Tarjeta gráfica MSI GeForce RTX 3060 Ventus 2X 12G', 10000, 3, 9),
(18, 'Gigabyte WINDFORCE OC', 'Tarjeta gráfica Gigabyte WINDFORCE OC GeForce RTX 4070', 10000, 3, 10),
(19, 'Gigabyte GAMING OC', 'Tarjeta gráfica Gigabyte GAMING OC Radeon RX 7800 XT', 10000, 3, 10),
(20, 'ASRock Radeon RX6700XT CLD 12G', 'Tarjeta gráfica ASRock Radeon RX6700XT CLD 12G', 10000, 3, 10),
(21, 'Asus ROG STRIX GAMING OC', 'Tarjeta gráfica Asus ROG STRIX GAMING OC GeForce RTX 4090', 10000, 3, 10),
(22, 'Asus TUF GAMING OC', 'Tarjeta gráfica Asus TUF GAMING OC GeForce RTX 4070 Ti', 10000, 3, 10),
(23, 'PNY VCNRTX6000ADA-PB', 'Tarjeta gráfica PNY VCNRTX6000ADA-PB RTX 6000 Ada Generation', 10000, 3, 10),
(24, 'Gigabyte EAGLE', 'Tarjeta gráfica Gigabyte EAGLE GeForce RTX 4060 Ti', 10000, 3, 10),
(25, 'ASRock Challenger D', 'Tarjeta gráfica ASRock Challenger D Radeon RX 6600', 10000, 3, 10),
(26, 'Asus TUF GAMING', 'Tarjeta gráfica Asus TUF GAMING GeForce RTX 4070 Ti', 10000, 3, 10),
(27, 'AMD Ryzen 7 7800X3D', 'Procesador AMD Ryzen 7 7800X3D, Zen 4, 4.2 GHz, 8 núcleos, 120W, Socket AM5', 15000, 2, 15),
(28, 'AMD Ryzen 5 5600X', 'Procesador AMD Ryzen 5 5600X, Zen 3, 3.7 GHz, 6 núcleos, 65W, Socket AM4', 15000, 2, 14),
(29, 'Intel Core i7-13700K', 'Procesador Intel Core i7-13700K, Raptor Lake, 3.4 GHz, 16 núcleos, 125W, Socket LGA1700', 15000, 2, 15),
(30, 'Intel Core i9-14900K', 'Procesador Intel Core i9-14900K, Raptor Lake Refresh, 3.2 GHz, 24 núcleos, 125W, Socket LGA1700', 15000, 2, 15),
(31, 'Intel Core i5-13600K', 'Procesador Intel Core i5-13600K, Raptor Lake, 3.5 GHz, 14 núcleos, 125W, Socket LGA1700', 15000, 2, 15),
(32, 'AMD Ryzen 9 7950X3D', 'Procesador AMD Ryzen 9 7950X3D, Zen 4, 4.2 GHz, 16 núcleos, 120W, Socket AM5', 15000, 2, 15),
(33, 'Intel Core i3-12100F', 'Procesador Intel Core i3-12100F, Alder Lake, 3.3 GHz, 4 núcleos, 58W, Socket LGA1700', 15000, 2, 15),
(34, 'AMD Threadripper 3990X', 'Procesador AMD Threadripper 3990X, Zen 2, 2.9 GHz, 64 núcleos, 280W, Socket sTRX4', 15000, 2, 15),
(35, 'Intel Core i5-9400F', 'Procesador Intel Core i5-9400F, Coffee Lake Refresh, 2.9 GHz, 6 núcleos, 65W, Socket LGA1151', 15000, 2, 15),
(36, 'AMD Threadripper 3970X', 'Procesador AMD Threadripper 3970X, Zen 2, 3.7 GHz, 32 núcleos, 280W, Socket sTRX4', 15000, 2, 15),
(37, 'MSI B550 GAMING GEN3', 'Placa madre MSI B550 GAMING GEN3, Zocalo AM4, Factor Forma ATX, MaxMemoria 128GB, DDR4', 25000, 1, 20),
(38, 'Gigabyte B650 AORUS ELITE AX', 'Placa madre Gigabyte B650 AORUS ELITE AX, Zocalo AM5, Factor Forma ATX, MaxMemoria 192 GB, DDR5', 25000, 1, 20),
(39, 'Gigabyte Z790 AORUS ELITE AX', 'Placa madre Gigabyte Z790 AORUS ELITE AX, Zocalo LGA1700, Factor Forma ATX, MaxMemoria 192GB, DDR5', 25000, 1, 20),
(40, 'ASRock B650M Pro RS WiFi', 'Placa madre ASRock B650M Pro RS WiFi, Zocalo AM5, Factor Forma Micro ATX, MaxMemoria 192 GB, DDR5', 25000, 1, 20),
(41, 'Asus ROG STRIX B760-I GAMING WIFI', 'Placa madre Asus ROG STRIX B760-I GAMING WIFI, Zocalo LGA1700, Factor Forma Mini ITX, MaxMemoria 96 GB, DDR5', 25000, 1, 19),
(42, 'Asus ROG ZENITH II EXTREME ALPHA', 'Placa madre Asus ROG ZENITH II EXTREME ALPHA, Zocalo TRX4, Factor Forma EATX, MaxMemoria 256GB, DDR4', 25000, 1, 20),
(43, 'MSI PRO B550M-VC WIFI', 'Placa madre MSI PRO B550M-VC WIFI, Zocalo AM4, Factor Forma Micro ATX, MaxMemoria 128GB, DDR4', 25000, 1, 20),
(44, 'Gigabyte B650I AORUS ULTRA', 'Placa madre Gigabyte B650I AORUS ULTRA, Zocalo AM5, Factor Forma Mini ITX, MaxMemoria 96GB, DDR5', 25000, 1, 20),
(45, 'MSI PRO B760-P WIFI DDR4', 'Placa madre MSI PRO B760-P WIFI DDR4, Zocalo LGA1700, Factor Forma ATX, MaxMemoria 128GB, DDR4', 25000, 1, 20),
(46, 'Asus TUF GAMING Z690-PLUS WIFI', 'Placa madre Asus TUF GAMING Z690-PLUS WIFI, Zocalo LGA1700, Factor Forma ATX, MaxMemoria 192GB, DDR5', 25000, 1, 20),
(47, 'Corsair Vengeance LPX 16GB', 'Memoria RAM Corsair Vengeance LPX 16GB, DDR5, 3200 MHz, 2 x 8GB', 12000, 7, 25),
(48, 'G.Skill Tridente Z5 RGB 32 GB', 'Memoria RAM G.Skill Tridente Z5 RGB 32 GB, DDR5, 6000 MHz, 2 x 16GB', 12000, 7, 25),
(49, 'G.Skill Tridente Z5 RGB 64 GB', 'Memoria RAM G.Skill Tridente Z5 RGB 64 GB, DDR5, 6400 MHz, 2 x 32GB', 12000, 7, 25),
(50, 'Corsair Venganza RGB 128 GB', 'Memoria RAM Corsair Venganza RGB 128 GB, DDR5, 5600 MHz, 4 x 32GB', 12000, 7, 24),
(51, 'TEAMGROUP T-Force Delta RGB 32 GB', 'Memoria RAM TEAMGROUP T-Force Delta RGB 32 GB, DDR5, 6000 MHz, 2 x 16GB', 12000, 7, 25),
(52, 'Silicon Power GAMING 16 GB', 'Memoria RAM Silicon Power GAMING 16 GB, DDR4, 3200 MHz, 2 x 8GB', 12000, 7, 25),
(53, 'Crucial Pro 32 GB', 'Memoria RAM Crucial Pro 32 GB, DDR5, 5600 MHz, 2 x 16GB', 12000, 7, 25),
(54, 'Kingston FURY Beast 16 GB', 'Memoria RAM Kingston FURY Beast 16 GB, DDR4, 3200 MHz, 2 x 8GB', 12000, 7, 25),
(55, 'Corsair Dominator Platinum RGB 32 GB', 'Memoria RAM Corsair Dominator Platinum RGB 32 GB, DDR5, 6200 MHz, 2 x 16GB', 12000, 7, 25),
(56, 'ADATA XPG Lancer Blade 32 GB', 'Memoria RAM ADATA XPG Lancer Blade 32 GB, DDR5, 6000 MHz, 2 x 16GB', 12000, 7, 25),
(57, 'Corsair 4000D Airflow', 'Gabinete Corsair 4000D Airflow, Torre media ATX, Color Negro, Volumen 48.5 litros, Panel Lateral Vidrio templado tintado', 32000, 8, 5),
(58, 'Lian Li O11 Dynamic EVO', 'Gabinete Lian Li O11 Dynamic EVO, Torre media ATX, Color Blanco / Gris, Volumen 60.8 litros, Panel Lateral Vidrio templado', 32000, 8, 5),
(59, 'Cooler Master MasterBox Q300L', 'Gabinete Cooler Master MasterBox Q300L, Minitorre MicroATX, Color Negro, Volumen 33.6 litros, Panel Lateral Acrílico', 32000, 8, 5),
(60, 'Silverstone ALTA F2', 'Gabinete Silverstone ALTA F2, Torre Completa ATX, Color Negro, Volumen 98.9 litros, Panel Lateral Vidrio templado', 32000, 8, 5),
(61, 'Fractal Design Pop Mini Air', 'Gabinete Fractal Design Pop Mini Air, Media torre MicroATX, Color Negro, Volumen 36.5 litros, Panel Lateral Vidrio templado', 32000, 8, 5),
(62, 'Corsair 7000D AIRFLOW', 'Gabinete Corsair 7000D AIRFLOW, Torre Completa ATX, Color Negro, Volumen 81.8 litros, Panel Lateral Vidrio templado', 32000, 8, 5),
(63, 'Phanteks Eclipse G360A', 'Gabinete Phanteks Eclipse G360A, Torre media ATX, Color Negro, Volumen 42.3 litros, Panel Lateral Vidrio templado', 32000, 8, 4),
(64, 'Cooler Master MasterBox NR200P', 'Gabinete Cooler Master MasterBox NR200P, Escritorio Mini ITX, Color Negro, Volumen 20.3 litros, Panel Lateral Vidrio templado', 32000, 8, 4),
(65, 'NZXT H5 Flow RGB', 'Gabinete NZXT H5 Flow RGB, Torre media ATX, Color Blanco, Volumen 46.9 litros, Panel Lateral Vidrio templado', 32000, 8, 5),
(66, 'HYTE Y70 Touch', 'Gabinete HYTE Y70 Touch, Torre media ATX, Color Blanco, Volumen 70.6 litros, Panel Lateral Vidrio templado', 32000, 8, 5),
(67, 'Corsair RM750e (2023)', 'Fuente de poder Corsair RM750e (2023), TipoFuente ATX, 750 W, Tipo Full, Eficiencia 80+ Gold', 45000, 4, 17),
(68, 'Corsair RM850e (2023)', 'Fuente de poder Corsair RM850e (2023), TipoFuente ATX, 1000 W, Tipo Full, Eficiencia 80+ Gold', 45000, 4, 17),
(69, 'Corsair SF750', 'Fuente de poder Corsair SF750, TipoFuente SFX, 750 W, Tipo Full, Eficiencia 80+ Platinum', 45000, 4, 16),
(70, 'Gigabyte UD750GM', 'Fuente de poder Gigabyte UD750GM, TipoFuente ATX, 750 W, Tipo Full, Eficiencia 80+ Gold', 45000, 4, 17),
(71, 'Cooler Master V850 SFX GOLD', 'Fuente de poder Cooler Master V850 SFX GOLD, TipoFuente SFX, 850 W, Tipo Full, Eficiencia 80+ Gold', 45000, 4, 17),
(72, 'MSI MAG A650BN', 'Fuente de poder MSI MAG A650BN, TipoFuente ATX, 650 W, Tipo No Modular, Eficiencia 80+ Bronze', 45000, 4, 17),
(73, 'MSI A1000G PCIE5', 'Fuente de poder MSI A1000G PCIE5, TipoFuente ATX, 1000 W, Tipo Full, Eficiencia 80+ Gold', 45000, 4, 16),
(74, 'EVGA 400 N1', 'Fuente de poder EVGA 400 N1, TipoFuente ATX, 400 W, Tipo No Modular, Eficiencia 75% Typical', 45000, 4, 17),
(75, 'Lian Li SP850', 'Fuente de poder Lian Li SP850, TipoFuente SFX, 850 W, Tipo Full, Eficiencia 80+ Gold', 45000, 4, 17),
(76, 'Asus ROG THOR P2 Gaming', 'Fuente de poder Asus ROG THOR P2 Gaming, TipoFuente ATX, 1200 W, Tipo Full, Eficiencia 80+ Platinum', 45000, 4, 17);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sucursal`
--

CREATE TABLE `sucursal` (
  `ID_Sucursal` int(11) NOT NULL,
  `Ubicacion` varchar(255) DEFAULT NULL,
  `Telefono` varchar(50) DEFAULT NULL,
  `Horario_Atencion` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sucursal`
--

INSERT INTO `sucursal` (`ID_Sucursal`, `Ubicacion`, `Telefono`, `Horario_Atencion`) VALUES
(1, 'Stgo Centro', '+56911223344', '08:00 AM - 20:00 PM'),
(2, 'Puente Alto', '+56922334455', '7:00 AM - 21:00 PM');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tarjetagrafica`
--

CREATE TABLE `tarjetagrafica` (
  `ID_TarjetaGrafica` int(11) NOT NULL,
  `ID_Producto` int(11) DEFAULT NULL,
  `Nombre` varchar(100) DEFAULT NULL,
  `Fabricante` varchar(100) DEFAULT NULL,
  `TipoGrafica` varchar(30) DEFAULT NULL,
  `Memoria` varchar(15) DEFAULT NULL,
  `TipoMemoria` varchar(10) DEFAULT NULL,
  `PotenciaW` varchar(10) DEFAULT NULL,
  `Longitud` varchar(20) DEFAULT NULL,
  `ImagenURL` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tarjetagrafica`
--

INSERT INTO `tarjetagrafica` (`ID_TarjetaGrafica`, `ID_Producto`, `Nombre`, `Fabricante`, `TipoGrafica`, `Memoria`, `TipoMemoria`, `PotenciaW`, `Longitud`, `ImagenURL`) VALUES
(4, 17, 'MSI GeForce RTX 3060 Ventus 2X 12G', 'MSI', 'GeForce RTX 3060 12GB', '12GB', 'GDDR6', '170W', '235 Milimetros', 'tarjetagrafica/1.jpg'),
(5, 18, 'Gigabyte WINDFORCE OC', 'Gigabyte', 'GeForce RTX 4070', '12GB', 'GDDDR6X', '200W', '261 Milimetros', '2'),
(6, 19, 'Gigabyte GAMING OC', 'Gigabyte', 'Radeon RX 7800 XT', '16GB', 'GDDR6', '263W', '302 Milimetros', '3'),
(7, 20, 'ASRock Radeon RX6700XT CLD 12G', 'ASRock', 'Radeon RX 6700 XT', '12GB', 'GDDR6', '230W', '269 Milimetros', '4'),
(8, 21, 'Asus ROG STRIX GAMING OC', 'Asus', 'GeForce RTX 4090', '24GB', 'GDDR6X', '450W', '358 Milimetros', '5'),
(9, 22, 'Asus TUF GAMING OC', 'Asus', 'GeForce RTX 4070 Ti', '12GB', 'GDDR6X', '285W', '305 Milimetros', '6'),
(10, 23, 'PNY VCNRTX6000ADA-PB', 'PNY', 'RTX 6000 Ada Generation', '48GB', 'GDDR6', '300W', '267 Milimetros', '7'),
(11, 24, 'Gigabyte EAGLE', 'Gigabyte', 'GeForce RTX 4060 Ti', '8GB', 'GDDR6', '165W', '272 Milimetros', '8'),
(12, 25, 'ASRock Challenger D', 'ASRock', 'Radeon RX 6600', '8GB', 'GDDR6', '132W', '269 Milimetros', '9'),
(13, 26, 'Asus TUF GAMING', 'Asus', 'GeForce RTX 4070 Ti', '12GB', 'GDDR6X', '285W', '305 Milimetros', '10');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `transaccion`
--

CREATE TABLE `transaccion` (
  `ID_Transaccion` int(11) NOT NULL,
  `ID_Cliente` int(11) DEFAULT NULL,
  `Fecha` date DEFAULT NULL,
  `Total` decimal(10,2) DEFAULT NULL,
  `ID_Sucursal` int(11) DEFAULT NULL,
  `Metodo_Pago` varchar(50) DEFAULT NULL,
  `ID_Cotizacion` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vendedor`
--

CREATE TABLE `vendedor` (
  `ID_Vendedor` int(11) NOT NULL,
  `Nombre` varchar(255) DEFAULT NULL,
  `Apellido` varchar(255) DEFAULT NULL,
  `Correo_Electronico` varchar(255) DEFAULT NULL,
  `Telefono` varchar(50) DEFAULT NULL,
  `ID_Sucursal` int(11) DEFAULT NULL,
  `Area_Especializacion` varchar(255) DEFAULT NULL,
  `pass` varchar(512) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `vendedor`
--

INSERT INTO `vendedor` (`ID_Vendedor`, `Nombre`, `Apellido`, `Correo_Electronico`, `Telefono`, `ID_Sucursal`, `Area_Especializacion`, `pass`) VALUES
(8, 'Alfonso', 'Contreras', 'orfheres@gmail.com', '+56946317762', 1, 'Batallon Maipo 02877', '$2b$10$hkAPly1MZWFrAxxTCB3V.ODteFXgL9fN6Fyrh7mlF7oE1UJTM79vu'),
(9, 'Felipe', 'Muñoz', 'LF.Munoz@gmail.com', '+56954129309', 2, 'Casa del Felipe', '123456'),
(10, 'Yoselyn', 'Bascuñan', 'yoselyn.Bascunan@gmail.com', '+56931859058', 2, 'Indefinida este mes', '123456'),
(11, 'kairos', 'black', 'kairos@mail.cl', '+5692225556', 1, 'batallon maipo 02877', '123');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administrador`
--
ALTER TABLE `administrador`
  ADD PRIMARY KEY (`ID_Administrador`);

--
-- Indices de la tabla `almacenamiento`
--
ALTER TABLE `almacenamiento`
  ADD PRIMARY KEY (`ID_Almacenamiento`),
  ADD KEY `ID_Producto` (`ID_Producto`);

--
-- Indices de la tabla `categoria_producto`
--
ALTER TABLE `categoria_producto`
  ADD PRIMARY KEY (`ID_Categoria`);

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`ID_Cliente`);

--
-- Indices de la tabla `cooler`
--
ALTER TABLE `cooler`
  ADD PRIMARY KEY (`ID_Cooler`),
  ADD KEY `ID_Producto` (`ID_Producto`);

--
-- Indices de la tabla `cotizacion`
--
ALTER TABLE `cotizacion`
  ADD PRIMARY KEY (`ID_Cotizacion`),
  ADD KEY `cotizacion_ibfk_1` (`ID_Cliente`),
  ADD KEY `cotizacion_ibfk_2` (`ID_Vendedor`);

--
-- Indices de la tabla `detalle_venta`
--
ALTER TABLE `detalle_venta`
  ADD PRIMARY KEY (`ID_DetalleVenta`),
  ADD KEY `ID_Transaccion` (`ID_Transaccion`),
  ADD KEY `detalle_venta_ibfk_2` (`ID_Producto`),
  ADD KEY `ID_Cotizacion` (`ID_Cotizacion`),
  ADD KEY `detalle_venta_ibfk_3` (`ID_Vendedor`);

--
-- Indices de la tabla `fuentepoder`
--
ALTER TABLE `fuentepoder`
  ADD PRIMARY KEY (`ID_FuentePoder`),
  ADD KEY `fuentepoder_ibfk_1` (`ID_Producto`);

--
-- Indices de la tabla `gabinete`
--
ALTER TABLE `gabinete`
  ADD PRIMARY KEY (`ID_Gabinete`),
  ADD KEY `ID_Producto` (`ID_Producto`);

--
-- Indices de la tabla `imagenes`
--
ALTER TABLE `imagenes`
  ADD PRIMARY KEY (`ID_Imagen`),
  ADD KEY `ID_Producto` (`ID_Producto`);

--
-- Indices de la tabla `memoriaram`
--
ALTER TABLE `memoriaram`
  ADD PRIMARY KEY (`ID_Ram`),
  ADD KEY `ID_Producto` (`ID_Producto`);

--
-- Indices de la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD PRIMARY KEY (`ID_Pedido`),
  ADD KEY `pedido_ibfk_1` (`ID_Cliente`);

--
-- Indices de la tabla `placamadre`
--
ALTER TABLE `placamadre`
  ADD PRIMARY KEY (`ID_PlacaMadre`),
  ADD KEY `placamadre_ibfk_1` (`ID_Producto`);

--
-- Indices de la tabla `procesador`
--
ALTER TABLE `procesador`
  ADD PRIMARY KEY (`ID_Procesador`),
  ADD KEY `procesador_ibfk_1` (`ID_Producto`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`ID_Producto`);

--
-- Indices de la tabla `sucursal`
--
ALTER TABLE `sucursal`
  ADD PRIMARY KEY (`ID_Sucursal`);

--
-- Indices de la tabla `tarjetagrafica`
--
ALTER TABLE `tarjetagrafica`
  ADD PRIMARY KEY (`ID_TarjetaGrafica`),
  ADD KEY `tarjetagrafica_ibfk_1` (`ID_Producto`);

--
-- Indices de la tabla `transaccion`
--
ALTER TABLE `transaccion`
  ADD PRIMARY KEY (`ID_Transaccion`),
  ADD KEY `ID_Sucursal` (`ID_Sucursal`),
  ADD KEY `transaccion_ibfk_1` (`ID_Cliente`),
  ADD KEY `fk_cotizacion` (`ID_Cotizacion`);

--
-- Indices de la tabla `vendedor`
--
ALTER TABLE `vendedor`
  ADD PRIMARY KEY (`ID_Vendedor`),
  ADD KEY `ID_Sucursal` (`ID_Sucursal`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `administrador`
--
ALTER TABLE `administrador`
  MODIFY `ID_Administrador` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `almacenamiento`
--
ALTER TABLE `almacenamiento`
  MODIFY `ID_Almacenamiento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `categoria_producto`
--
ALTER TABLE `categoria_producto`
  MODIFY `ID_Categoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `ID_Cliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=111;

--
-- AUTO_INCREMENT de la tabla `cooler`
--
ALTER TABLE `cooler`
  MODIFY `ID_Cooler` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `cotizacion`
--
ALTER TABLE `cotizacion`
  MODIFY `ID_Cotizacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=117;

--
-- AUTO_INCREMENT de la tabla `detalle_venta`
--
ALTER TABLE `detalle_venta`
  MODIFY `ID_DetalleVenta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=307;

--
-- AUTO_INCREMENT de la tabla `fuentepoder`
--
ALTER TABLE `fuentepoder`
  MODIFY `ID_FuentePoder` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `gabinete`
--
ALTER TABLE `gabinete`
  MODIFY `ID_Gabinete` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `imagenes`
--
ALTER TABLE `imagenes`
  MODIFY `ID_Imagen` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT de la tabla `memoriaram`
--
ALTER TABLE `memoriaram`
  MODIFY `ID_Ram` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `placamadre`
--
ALTER TABLE `placamadre`
  MODIFY `ID_PlacaMadre` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `procesador`
--
ALTER TABLE `procesador`
  MODIFY `ID_Procesador` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `ID_Producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT de la tabla `tarjetagrafica`
--
ALTER TABLE `tarjetagrafica`
  MODIFY `ID_TarjetaGrafica` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `transaccion`
--
ALTER TABLE `transaccion`
  MODIFY `ID_Transaccion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT de la tabla `vendedor`
--
ALTER TABLE `vendedor`
  MODIFY `ID_Vendedor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `almacenamiento`
--
ALTER TABLE `almacenamiento`
  ADD CONSTRAINT `almacenamiento_ibfk_1` FOREIGN KEY (`ID_Producto`) REFERENCES `producto` (`ID_Producto`);

--
-- Filtros para la tabla `cooler`
--
ALTER TABLE `cooler`
  ADD CONSTRAINT `cooler_ibfk_1` FOREIGN KEY (`ID_Producto`) REFERENCES `producto` (`ID_Producto`);

--
-- Filtros para la tabla `cotizacion`
--
ALTER TABLE `cotizacion`
  ADD CONSTRAINT `cotizacion_ibfk_1` FOREIGN KEY (`ID_Cliente`) REFERENCES `cliente` (`ID_Cliente`),
  ADD CONSTRAINT `cotizacion_ibfk_2` FOREIGN KEY (`ID_Vendedor`) REFERENCES `vendedor` (`ID_Vendedor`);

--
-- Filtros para la tabla `detalle_venta`
--
ALTER TABLE `detalle_venta`
  ADD CONSTRAINT `detalle_venta_ibfk_1` FOREIGN KEY (`ID_Transaccion`) REFERENCES `transaccion` (`ID_Transaccion`),
  ADD CONSTRAINT `detalle_venta_ibfk_2` FOREIGN KEY (`ID_Producto`) REFERENCES `producto` (`ID_Producto`),
  ADD CONSTRAINT `detalle_venta_ibfk_3` FOREIGN KEY (`ID_Vendedor`) REFERENCES `vendedor` (`ID_Vendedor`),
  ADD CONSTRAINT `detalle_venta_ibfk_4` FOREIGN KEY (`ID_Cotizacion`) REFERENCES `cotizacion` (`ID_Cotizacion`);

--
-- Filtros para la tabla `fuentepoder`
--
ALTER TABLE `fuentepoder`
  ADD CONSTRAINT `fuentepoder_ibfk_1` FOREIGN KEY (`ID_Producto`) REFERENCES `producto` (`ID_Producto`);

--
-- Filtros para la tabla `gabinete`
--
ALTER TABLE `gabinete`
  ADD CONSTRAINT `gabinete_ibfk_1` FOREIGN KEY (`ID_Producto`) REFERENCES `producto` (`ID_Producto`);

--
-- Filtros para la tabla `imagenes`
--
ALTER TABLE `imagenes`
  ADD CONSTRAINT `imagenes_ibfk_1` FOREIGN KEY (`ID_Producto`) REFERENCES `producto` (`ID_Producto`);

--
-- Filtros para la tabla `memoriaram`
--
ALTER TABLE `memoriaram`
  ADD CONSTRAINT `memoriaram_ibfk_1` FOREIGN KEY (`ID_Producto`) REFERENCES `producto` (`ID_Producto`);

--
-- Filtros para la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD CONSTRAINT `pedido_ibfk_1` FOREIGN KEY (`ID_Cliente`) REFERENCES `cliente` (`ID_Cliente`);

--
-- Filtros para la tabla `placamadre`
--
ALTER TABLE `placamadre`
  ADD CONSTRAINT `placamadre_ibfk_1` FOREIGN KEY (`ID_Producto`) REFERENCES `producto` (`ID_Producto`);

--
-- Filtros para la tabla `procesador`
--
ALTER TABLE `procesador`
  ADD CONSTRAINT `procesador_ibfk_1` FOREIGN KEY (`ID_Producto`) REFERENCES `producto` (`ID_Producto`);

--
-- Filtros para la tabla `tarjetagrafica`
--
ALTER TABLE `tarjetagrafica`
  ADD CONSTRAINT `tarjetagrafica_ibfk_1` FOREIGN KEY (`ID_Producto`) REFERENCES `producto` (`ID_Producto`);

--
-- Filtros para la tabla `transaccion`
--
ALTER TABLE `transaccion`
  ADD CONSTRAINT `fk_cotizacion` FOREIGN KEY (`ID_Cotizacion`) REFERENCES `cotizacion` (`ID_Cotizacion`),
  ADD CONSTRAINT `transaccion_ibfk_1` FOREIGN KEY (`ID_Cliente`) REFERENCES `cliente` (`ID_Cliente`),
  ADD CONSTRAINT `transaccion_ibfk_2` FOREIGN KEY (`ID_Sucursal`) REFERENCES `sucursal` (`ID_Sucursal`);

--
-- Filtros para la tabla `vendedor`
--
ALTER TABLE `vendedor`
  ADD CONSTRAINT `vendedor_ibfk_1` FOREIGN KEY (`ID_Sucursal`) REFERENCES `sucursal` (`ID_Sucursal`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
