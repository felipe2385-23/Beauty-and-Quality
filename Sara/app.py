from flask import Flask, render_template, request, redirect, url_for, session, flash, jsonify
from controllers.usuario_controller import UsuarioController
from controllers.producto_controller import ProductoController
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)
app.secret_key = 'glambeauty_secret_key_2024'
app.config['UPLOAD_FOLDER'] = 'static/images'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max

# Inicializar controladores
usuario_controller = UsuarioController()
producto_controller = ProductoController()

# Crear carpeta de imágenes si no existe
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        correo = request.form['correo']
        contrasena = request.form['contrasena']
        
        usuario = usuario_controller.autenticar(correo, contrasena)
        
        if usuario:
            session['usuario_id'] = usuario['id']
            session['nombre'] = usuario['nombre']
            session['rol'] = usuario['rol']
            
            if usuario['rol'] == 'Administrador':
                return redirect(url_for('admin'))
            else:
                return redirect(url_for('cliente'))
        else:
            flash('Correo o contraseña incorrectos', 'error')
    
    return render_template('login.html')

@app.route('/registro', methods=['GET', 'POST'])
def registro():
    if request.method == 'POST':
        nombre = request.form['nombre']
        correo = request.form['correo']
        contrasena = request.form['contrasena']
        
        # Verificar si el correo ya existe
        if usuario_controller.obtener_por_correo(correo):
            flash('El correo ya está registrado', 'error')
            return render_template('registro.html')
        
        # Registrar como Cliente por defecto
        if usuario_controller.registrar(nombre, correo, contrasena, 'Cliente'):
            flash('Registro exitoso. Inicia sesión', 'success')
            return redirect(url_for('login'))
        else:
            flash('Error al registrar usuario', 'error')
    
    return render_template('registro.html')

@app.route('/cliente')
def cliente():
    if 'usuario_id' not in session:
        return redirect(url_for('login'))
    
    productos = producto_controller.obtener_todos()
    return render_template('cliente.html', productos=productos, nombre=session['nombre'])

@app.route('/admin/catalogo')
def admin_catalogo():
    if 'usuario_id' not in session or session['rol'] != 'Administrador':
        flash('Acceso no autorizado', 'error')
        return redirect(url_for('login'))
    
    productos = producto_controller.obtener_todos()
    return render_template('admin_catalogo.html', productos=productos, nombre=session['nombre'])

@app.route('/admin')
def admin():
    if 'usuario_id' not in session or session['rol'] != 'Administrador':
        flash('Acceso no autorizado', 'error')
        return redirect(url_for('login'))
    
    productos = producto_controller.obtener_todos()
    return render_template('admin.html', productos=productos, nombre=session['nombre'])

@app.route('/admin/agregar_producto', methods=['POST'])
def agregar_producto():
    if 'usuario_id' not in session or session['rol'] != 'Administrador':
        return jsonify({'error': 'No autorizado'}), 403
    
    nombre = request.form['nombre']
    descripcion = request.form['descripcion']
    precio = request.form['precio']
    
    # Manejo de imagen
    imagen = 'default.jpg'
    if 'imagen' in request.files:
        file = request.files['imagen']
        if file and file.filename != '':
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            imagen = filename
    
    if producto_controller.crear(nombre, descripcion, precio, imagen):
        flash('Producto agregado exitosamente', 'success')
    else:
        flash('Error al agregar producto', 'error')
    
    return redirect(url_for('admin'))

@app.route('/admin/editar_producto/<int:id>', methods=['POST'])
def editar_producto(id):
    if 'usuario_id' not in session or session['rol'] != 'Administrador':
        return jsonify({'error': 'No autorizado'}), 403
    
    nombre = request.form['nombre']
    descripcion = request.form['descripcion']
    precio = request.form['precio']
    
    # Obtener producto actual para mantener la imagen si no se sube una nueva
    producto_actual = producto_controller.obtener_por_id(id)
    imagen = producto_actual['imagen']
    
    if 'imagen' in request.files:
        file = request.files['imagen']
        if file and file.filename != '':
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            imagen = filename
    
    if producto_controller.actualizar(id, nombre, descripcion, precio, imagen):
        flash('Producto actualizado exitosamente', 'success')
    else:
        flash('Error al actualizar producto', 'error')
    
    return redirect(url_for('admin'))

@app.route('/admin/eliminar_producto/<int:id>', methods=['POST'])
def eliminar_producto(id):
    if 'usuario_id' not in session or session['rol'] != 'Administrador':
        return jsonify({'error': 'No autorizado'}), 403
    
    if producto_controller.eliminar(id):
        flash('Producto eliminado exitosamente', 'success')
    else:
        flash('Error al eliminar producto', 'error')
    
    return redirect(url_for('admin'))

@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True, port=5000)