from models.usuario import Usuario

class UsuarioController:
    def __init__(self):
        self.modelo = Usuario()
    
    def registrar(self, nombre, correo, contrasena, rol='Cliente'):
        return self.modelo.crear_usuario(nombre, correo, contrasena, rol)
    
    def autenticar(self, correo, contrasena):
        return self.modelo.autenticar(correo, contrasena)
    
    def obtener_por_correo(self, correo):
        return self.modelo.obtener_por_correo(correo)
    
    def obtener_todos(self):
        return self.modelo.obtener_todos()