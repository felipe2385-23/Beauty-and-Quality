from models.producto import Producto

class ProductoController:
    def __init__(self):
        self.modelo = Producto()
    
    def crear(self, nombre, descripcion, precio, imagen):
        return self.modelo.crear_producto(nombre, descripcion, precio, imagen)
    
    def obtener_todos(self):
        return self.modelo.obtener_todos()
    
    def obtener_por_id(self, id):
        return self.modelo.obtener_por_id(id)
    
    def actualizar(self, id, nombre, descripcion, precio, imagen):
        return self.modelo.actualizar_producto(id, nombre, descripcion, precio, imagen)
    
    def eliminar(self, id):
        return self.modelo.eliminar_producto(id)