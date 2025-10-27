// Animación de entrada para las secciones
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar todas las secciones principales
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.hero-section, .features-section, .cta-section, .testimonials-section');
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
    
    // Animación de aparición escalonada para features
    const features = document.querySelectorAll('.feature');
    features.forEach((feature, index) => {
        feature.style.opacity = '0';
        feature.style.transform = 'translateY(30px)';
        feature.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(feature);
    });
    
    // Animación de aparición escalonada para testimonios
    const testimonials = document.querySelectorAll('.testimonial');
    testimonials.forEach((testimonial, index) => {
        testimonial.style.opacity = '0';
        testimonial.style.transform = 'translateY(30px)';
        testimonial.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
        observer.observe(testimonial);
    });
    
    // Contador animado para las estadísticas
    const stats = document.querySelectorAll('.stat-number');
    const animateCount = (element) => {
        const target = element.textContent.replace('+', '');
        const isK = target.includes('K');
        const number = parseFloat(target.replace('K', ''));
        const finalNumber = isK ? number * 1000 : number;
        const duration = 2000;
        const increment = finalNumber / (duration / 16);
        let current = 0;
        
        const updateCount = () => {
            current += increment;
            if (current < finalNumber) {
                if (isK) {
                    element.textContent = (current / 1000).toFixed(1) + 'K+';
                } else {
                    element.textContent = Math.floor(current) + '+';
                }
                requestAnimationFrame(updateCount);
            } else {
                element.textContent = target + '+';
            }
        };
        
        updateCount();
    };
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                animateCount(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => statsObserver.observe(stat));
});