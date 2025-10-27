import mysql.connector
from mysql.connector import Error

class Usuario:
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
    
    def crear_usuario(self, nombre, correo, contrasena, rol):
        try:
            cursor = self.connection.cursor()
            
            # Obtener id del rol
            cursor.execute("SELECT id FROM roles WHERE nombre = %s", (rol,))
            rol_id = cursor.fetchone()
            
            if not rol_id:
                return False
            
            query = """
                INSERT INTO usuarios (nombre, correo, contrasena, rol_id)
                VALUES (%s, %s, %s, %s)
            """
            cursor.execute(query, (nombre, correo, contrasena, rol_id[0]))
            self.connection.commit()
            cursor.close()
            return True
        except Error as e:
            print(f"Error al crear usuario: {e}")
            return False
    
    def obtener_por_correo(self, correo):
        try:
            cursor = self.connection.cursor(dictionary=True)
            query = """
                SELECT u.id, u.nombre, u.correo, u.contrasena, r.nombre as rol
                FROM usuarios u
                INNER JOIN roles r ON u.rol_id = r.id
                WHERE u.correo = %s
            """
            cursor.execute(query, (correo,))
            usuario = cursor.fetchone()
            cursor.close()
            return usuario
        except Error as e:
            print(f"Error al obtener usuario: {e}")
            return None
    
    def autenticar(self, correo, contrasena):
        usuario = self.obtener_por_correo(correo)
        if usuario and usuario['contrasena'] == contrasena:
            return usuario
        return None
    
    def obtener_todos(self):
        try:
            cursor = self.connection.cursor(dictionary=True)
            query = """
                SELECT u.id, u.nombre, u.correo, r.nombre as rol
                FROM usuarios u
                INNER JOIN roles r ON u.rol_id = r.id
            """
            cursor.execute(query)
            usuarios = cursor.fetchall()
            cursor.close()
            return usuarios
        except Error as e:
            print(f"Error al obtener usuarios: {e}")
            return []