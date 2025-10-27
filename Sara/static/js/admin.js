// Funciones para manejar modales
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Cerrar modal al hacer clic fuera de él
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}

// Función para abrir modal de edición
function openEditModal(id, nombre, descripcion, precio, imagen) {
    document.getElementById('edit_id').value = id;
    document.getElementById('edit_nombre').value = nombre;
    document.getElementById('edit_descripcion').value = descripcion;
    document.getElementById('edit_precio').value = precio;
    document.getElementById('current_imagen').textContent = imagen;
    
    // Configurar la acción del formulario
    document.getElementById('formEditar').action = `/admin/editar_producto/${id}`;
    
    openModal('modalEditar');
}

// Función para confirmar eliminación
function confirmDelete(id, nombre) {
    document.getElementById('delete_nombre').textContent = nombre;
    document.getElementById('formEliminar').action = `/admin/eliminar_producto/${id}`;
    openModal('modalEliminar');
}

// Cerrar alertas automáticamente después de 5 segundos
setTimeout(function() {
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
        alert.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        alert.style.opacity = '0';
        alert.style.transform = 'translateY(-20px)';
        setTimeout(() => alert.remove(), 500);
    });
}, 5000);

// Validación de formularios
document.getElementById('formAgregar').addEventListener('submit', function(e) {
    const precio = parseFloat(document.getElementById('precio').value);
    if (precio < 0) {
        alert('El precio no puede ser negativo');
        e.preventDefault();
        return false;
    }
});

document.getElementById('formEditar').addEventListener('submit', function(e) {
    const precio = parseFloat(document.getElementById('edit_precio').value);
    if (precio < 0) {
        alert('El precio no puede ser negativo');
        e.preventDefault();
        return false;
    }
});

// Animación de entrada para las estadísticas
document.addEventListener('DOMContentLoaded', function() {
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100);
    });
    
    // Animación de entrada para las filas de la tabla
    const tableRows = document.querySelectorAll('.table-row');
    tableRows.forEach((row, index) => {
        row.style.opacity = '0';
        row.style.transform = 'translateX(-20px)';
        row.style.transition = `opacity 0.4s ease ${index * 0.05}s, transform 0.4s ease ${index * 0.05}s`;
        
        setTimeout(() => {
            row.style.opacity = '1';
            row.style.transform = 'translateX(0)';
        }, 200);
    });
});