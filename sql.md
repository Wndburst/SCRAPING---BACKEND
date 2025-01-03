
SELECT * FROM ProductosTiendasExternas;
SELECT * FROM AsociacionesProductos;
SELECT * FROM productosmimbral;
SELECT * FROM HistorialPreciosMimbral;
SELECT * FROM HistorialPreciosExternos;

drop table AsociacionesProductos;
drop table ProductosMimbral;
drop table ProductosTiendasExternas;
drop table HistorialPreciosMimbral;
drop table HistorialPreciosExternos;

CREATE TABLE ProductosMimbral (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tienda VARCHAR(100),
    sku VARCHAR(50),
    nombre VARCHAR(150),
    precio INT,
    marca VARCHAR(50),
    categoria VARCHAR(80),
    url VARCHAR(1000),
    imageurl text,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY unique_producto (tienda, sku, nombre, marca)
);

CREATE TABLE ProductosTiendasExternas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tienda VARCHAR(100),
    sku VARCHAR(50),
    nombre VARCHAR(150),
    precio INT,
    marca VARCHAR(50),
    url VARCHAR(1000),
    imageurl text,
	vendedor VARCHAR(100) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY unique_producto (tienda, sku, nombre, marca)
);

CREATE TABLE HistorialPreciosMimbral (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_producto INT, 
    tienda VARCHAR(100), 
    precio_anterior INT,
    precio_nuevo INT,
    fecha_cambio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_producto) REFERENCES ProductosMimbral(id)
    ON DELETE CASCADE ON UPDATE CASCADE
);

-- TRIGGER MIMBRAL

DELIMITER //

DROP TRIGGER IF EXISTS after_update_mimbral;

CREATE TRIGGER after_update_mimbral
AFTER UPDATE ON ProductosMimbral
FOR EACH ROW
BEGIN
    -- Verifica si el precio cambió
    IF OLD.precio <> NEW.precio THEN
        INSERT INTO HistorialPreciosMimbral (id_producto, tienda, precio_anterior, precio_nuevo, fecha_cambio)
        VALUES (NEW.id, 'Mimbral', OLD.precio, NEW.precio, NOW());
    END IF;
END;
//


CREATE TABLE HistorialPreciosExternos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_producto INT, 
    tienda VARCHAR(100), 
    precio_anterior INT,
    precio_nuevo INT,
    fecha_cambio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_producto) REFERENCES ProductosTiendasExternas(id)
    ON DELETE CASCADE ON UPDATE CASCADE
);

-- TRIGGER Tienda externa

DELIMITER //

DROP TRIGGER IF EXISTS after_update_externas;

CREATE TRIGGER after_update_externas
AFTER UPDATE ON ProductosTiendasExternas
FOR EACH ROW
BEGIN
    -- Verifica si el precio cambió
    IF OLD.precio <> NEW.precio THEN
        INSERT INTO HistorialPreciosExternos (id_producto, tienda, precio_anterior, precio_nuevo, fecha_cambio)
        VALUES (NEW.id, NEW.tienda, OLD.precio, NEW.precio, NOW());
    END IF;
END;
//


CREATE TABLE AsociacionesProductos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_producto_mimbral INT,
    id_producto_externo INT,
    FOREIGN KEY (id_producto_mimbral) REFERENCES ProductosMimbral(id),
    FOREIGN KEY (id_producto_externo) REFERENCES ProductosTiendasExternas(id),
    UNIQUE KEY unique_asociacion (id_producto_mimbral, id_producto_externo)
);


CREATE TABLE Usuarios (
    rut VARCHAR(10) PRIMARY KEY, -- RUT como clave primaria
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL, -- Correo único
    password VARCHAR(255) NOT NULL, -- Contraseña en formato hash
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


