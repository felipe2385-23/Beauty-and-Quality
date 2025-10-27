// =======================
// 🔒 Mostrar/Ocultar Contraseña
// =======================
document.querySelectorAll('.toggle-password').forEach(button => {
    button.addEventListener('click', () => {
        const fieldId = button.getAttribute('data-target');
        const passwordInput = document.getElementById(fieldId);

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
// 💪 Medir la fuerza de la contraseña
// =======================
function checkPasswordStrength(password) {
    const strengthBar = document.querySelector('.strength-bar');
    let strength = 0;
    
    if (password.length >= 4) strength++;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    strengthBar.className = 'strength-bar';
    
    if (strength <= 2) {
        strengthBar.classList.add('strength-weak');
    } else if (strength <= 3) {
        strengthBar.classList.add('strength-medium');
    } else {
        strengthBar.classList.add('strength-strong');
    }
}

// Detectar cambios en la contraseña y medir fuerza
document.getElementById('contrasena').addEventListener('input', function() {
    checkPasswordStrength(this.value);
});

// =======================
// ✅ Validación del formulario
// =======================
document.getElementById('registroForm').addEventListener('submit', function(e) {
    let isValid = true;

    // Limpiar mensajes previos
    document.getElementById('nombreError').textContent = '';
    document.getElementById('correoError').textContent = '';
    document.getElementById('contrasenaError').textContent = '';
    document.getElementById('confirmarError').textContent = '';
    
    // Validar nombre
    const nombre = document.getElementById('nombre').value.trim();
    if (!nombre) {
        document.getElementById('nombreError').textContent = 'El nombre es obligatorio';
        isValid = false;
    } else if (nombre.length < 3) {
        document.getElementById('nombreError').textContent = 'El nombre debe tener al menos 3 caracteres';
        isValid = false;
    }
    
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
    
    // Validar confirmación
    const confirmar = document.getElementById('confirmar').value;
    if (!confirmar) {
        document.getElementById('confirmarError').textContent = 'Confirma tu contraseña';
        isValid = false;
    } else if (contrasena !== confirmar) {
        document.getElementById('confirmarError').textContent = 'Las contraseñas no coinciden';
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

    const benefits = document.querySelector('.benefits');
    if (benefits) {
        benefits.style.opacity = '0';
        benefits.style.transform = 'scale(0.95)';
        benefits.style.transition = 'opacity 0.6s ease 0.5s, transform 0.6s ease 0.5s';
        
        setTimeout(() => {
            benefits.style.opacity = '1';
            benefits.style.transform = 'scale(1)';
        }, 100);
    }
});
