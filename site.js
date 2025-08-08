const themeToggle = document.querySelector('.theme-toggle');
const appsToggle = document.querySelector('.apps-toggle');
const appsDrawer = document.querySelector('.apps-drawer');
const body = document.body;

const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    const icon = themeToggle.querySelector('.theme-icon');
    icon.style.transform = 'rotate(180deg)';
    setTimeout(() => {
        icon.style.transform = 'rotate(0deg)';
    }, 300);
});

appsToggle.addEventListener('click', () => {
    appsDrawer.classList.toggle('open');
    body.style.overflow = appsDrawer.classList.contains('open') ? 'hidden' : '';
});

document.addEventListener('click', (e) => {
    if (!appsDrawer.contains(e.target) && !appsToggle.contains(e.target)) {
        appsDrawer.classList.remove('open');
        body.style.overflow = '';
    }
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.transform = 'translateY(0)';
        return;
    }
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

document.querySelectorAll('.app-link').forEach(link => {
    link.addEventListener('click', (e) => {
        const rect = link.getBoundingClientRect();
        const ripple = document.createElement('div');
        ripple.style.position = 'fixed';
        ripple.style.left = rect.left + 'px';
        ripple.style.top = rect.top + 'px';
        ripple.style.width = rect.width + 'px';
        ripple.style.height = rect.height + 'px';
        ripple.style.background = 'var(--accent-color)';
        ripple.style.opacity = '0.5';
        ripple.style.pointerEvents = 'none';
        ripple.style.transition = 'all 0.6s ease';
        ripple.style.zIndex = '9999';
        
        document.body.appendChild(ripple);
        
        setTimeout(() => {
            ripple.style.transform = 'scale(3)';
            ripple.style.opacity = '0';
        }, 10);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    heroTitle.addEventListener('mouseenter', () => {
        heroTitle.style.transform = 'skew(-2deg)';
    });
    
    heroTitle.addEventListener('mouseleave', () => {
        heroTitle.style.transform = 'skew(0deg)';
    });
    
    heroTitle.style.transition = 'transform 0.2s ease';
}
