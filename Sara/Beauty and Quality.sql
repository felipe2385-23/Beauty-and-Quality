-- Crear base de datos
CREATE DATABASE IF NOT EXISTS glam_beauty;
USE glam_beauty;

-- Tabla de roles
CREATE TABLE IF NOT EXISTS roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

-- Insertar roles predefinidos
INSERT INTO roles (nombre) VALUES ('Administrador'), ('Cliente');

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL,
    rol_id INT NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (rol_id) REFERENCES roles(id)
);

-- Tabla de productos
CREATE TABLE IF NOT EXISTS productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    imagen VARCHAR(255) DEFAULT 'default.jpg',
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar un usuario administrador por defecto
-- Correo: admin@glambeauty.com
-- Contraseña: admin123
INSERT INTO usuarios (nombre, correo, contrasena, rol_id) 
VALUES ('Sara Lesmes', 'lesmes.sara@gmail.com', 'lesmes1023', 1);

-- Insertar un usuario cliente de ejemplo
-- Correo: cliente@example.com
-- Contraseña: cliente123
INSERT INTO usuarios (nombre, correo, contrasena, rol_id) 
VALUES ('Felipe', 'davidfeliperodriguezl1604@gmail.com', '2386', 2);

