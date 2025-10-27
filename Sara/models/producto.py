import mysql.connector
from mysql.connector import Error

class Producto:
    def __init__(self):
        self.connection = None
        self.conectar()
    
    def conectar(self):
        try:
            self.connection = mysql.connector.connect(
                host='localhost',
                database='glam_beauty',
                user='root',
                password=''  # Cambia esto según tu configuración
            )
        except Error as e:
            print(f"Error al conectar a MySQL: {e}")
    
    def cerrar_conexion(self):
        if self.connection and self.connection.is_connected():
            self.connection.close()
    
    def crear_producto(self, nombre, descripcion, precio, imagen):
        try:
            cursor = self.connection.cursor()
            query = """
                INSERT INTO productos (nombre, descripcion, precio, imagen)
                VALUES (%s, %s, %s, %s)
            """
            cursor.execute(query, (nombre, descripcion, precio, imagen))
            self.connection.commit()
            cursor.close()
            return True
        except Error as e:
            print(f"Error al crear producto: {e}")
            return False
    
    def obtener_todos(self):
        try:
            cursor = self.connection.cursor(dictionary=True)
            query = "SELECT * FROM productos ORDER BY id DESC"
            cursor.execute(query)
            productos = cursor.fetchall()
            cursor.close()
            return productos
        except Error as e:
            print(f"Error al obtener productos: {e}")
            return []
    
    def obtener_por_id(self, id):
        try:
            cursor = self.connection.cursor(dictionary=True)
            query = "SELECT * FROM productos WHERE id = %s"
            cursor.execute(query, (id,))
            producto = cursor.fetchone()
            cursor.close()
            return producto
        except Error as e:
            print(f"Error al obtener producto: {e}")
            return None
    
    def actualizar_producto(self, id, nombre, descripcion, precio, imagen):
        try:
            cursor = self.connection.cursor()
            query = """
                UPDATE productos
                SET nombre = %s, descripcion = %s, precio = %s, imagen = %s
                WHERE id = %s
            """
            cursor.execute(query, (nombre, descripcion, precio, imagen, id))
            self.connection.commit()
            cursor.close()
            return True
        except Error as e:
            print(f"Error al actualizar producto: {e}")
            return False
    
    def eliminar_producto(self, id):
        try:
            cursor = self.connection.cursor()
            query = "DELETE FROM productos WHERE id = %s"
            cursor.execute(query, (id,))
            self.connection.commit()
            cursor.close()
            return True
        except Error as e:
            print(f"Error al eliminar producto: {e}")
            return False