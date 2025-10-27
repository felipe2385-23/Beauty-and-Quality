// =======================
// 🔒 Mostrar/Ocultar Contraseña
// =======================
document.querySelectorAll('.toggle-password').forEach(button => {
    button.addEventListener('click', () => {
        const passwordInput = document.getElementById('contrasena');

        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            button.textContent = '🙈';
            button.classList.add('active');
        } else {
            passwordInput.type = 'password';
            button.textContent = '👁️';
            button.classList.remove('active');
        }
    });
});

// =======================
// ✅ Validación del formulario
// =======================
document.getElementById('loginForm').addEventListener('submit', function(e) {
    let isValid = true;

    // Limpiar mensajes de error previos
    document.getElementById('correoError').textContent = '';
    document.getElementById('contrasenaError').textContent = '';

    // Validar correo
    const correo = document.getElementById('correo').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!correo) {
        document.getElementById('correoError').textContent = 'El correo es obligatorio';
        isValid = false;
    } else if (!emailRegex.test(correo)) {
        document.getElementById('correoError').textContent = 'Ingresa un correo válido';
        isValid = false;
    }

    // Validar contraseña
    const contrasena = document.getElementById('contrasena').value;

    if (!contrasena) {
        document.getElementById('contrasenaError').textContent = 'La contraseña es obligatoria';
        isValid = false;
    } else if (contrasena.length < 4) {
        document.getElementById('contrasenaError').textContent = 'La contraseña debe tener al menos 4 caracteres';
        isValid = false;
    }

    if (!isValid) {
        e.preventDefault();
    }
});

// =======================
// ✨ Animación de entrada del formulario
// =======================
document.addEventListener('DOMContentLoaded', function() {
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach((group, index) => {
        group.style.opacity = '0';
        group.style.transform = 'translateY(20px)';
        group.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        
        setTimeout(() => {
            group.style.opacity = '1';
            group.style.transform = 'translateY(0)';
        }, 100);
    });
});
