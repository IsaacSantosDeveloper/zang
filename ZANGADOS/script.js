document.addEventListener('DOMContentLoaded', () => {
    
    // NOVO: Remove a classe 'preload' após o carregamento para reativar animações
    setTimeout(() => {
        document.body.classList.remove('preload');
    }, 500);

    // --- 0. NOVO: LÓGICA DO MENU HAMBURGUER ---
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav-links');
    const body = document.querySelector('body');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            // Ativa/desativa o menu
            nav.classList.toggle('active');
            // Ativa/desativa o ícone (X/Barras)
            menuToggle.classList.toggle('active');
            // Trava/destrava o scroll da página
            body.classList.toggle('menu-open');
        });
    }

    // --- 1. Rolagem Suave (MODIFICADO) ---
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Lógica de rolagem (existente)
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const headerOffset = document.querySelector('.main-header').offsetHeight;
                const elementPosition = targetSection.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset - 20;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
            
            // NOVO: Fechar o menu após clicar em um link (se estiver aberto)
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });
    });

    // --- 2. Copiar Discord (sem alteração) ---
    const copyButton = document.getElementById('copy-discord-btn');
    
    // !! IMPORTANTE: MUDE O LINK ABAIXO !!
    const discordLink = 'https://discord.gg/ZDFx7vhDDH'; 

    if (copyButton) {
        copyButton.addEventListener('click', () => {
            navigator.clipboard.writeText(discordLink)
                .then(() => {
                    copyButton.innerHTML = '<i class="fas fa-check"></i> COPIADO!';
                    setTimeout(() => {
                        copyButton.innerHTML = '<i class="fas fa-copy"></i> COPIAR LINK';
                    }, 2000);
                })
                .catch(err => {
                    console.error('Erro ao copiar link: ', err);
                    copyButton.innerHTML = '<i class="fas fa-times"></i> ERRO!';
                });
        });
    }

    // --- 3. Animações Iniciais (Hero) (sem alteração) ---
    const heroTitle = document.querySelector('.hero-title');
    const heroTagline = document.querySelector('.hero-tagline');
    const heroButton = document.querySelector('.btn-primary');
    if (heroTitle) setTimeout(() => heroTitle.classList.add('animated'), 100);
    if (heroTagline) setTimeout(() => heroTagline.classList.add('animated'), 300);
    if (heroButton) setTimeout(() => heroButton.classList.add('animated'), 500);

    // --- 4. Animação ao Scroll (Intersection Observer) (sem alteração) ---
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3, rootMargin: '0px 0px -50px 0px' });
    animateElements.forEach(element => observer.observe(element));

    // --- 5. Partículas (sem alteração) ---
    tsParticles.load("tsparticles", {
        fpsLimit: 60,
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#ff0000" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            links: { enable: true, distance: 120, color: "#ff0000", opacity: 0.2, width: 1 },
            move: { enable: true, speed: 1.5, direction: "none", out_mode: "out", bounce: false }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "repulse" },
                onclick: { enable: true, mode: "push" },
                resize: true
            },
            modes: {
                repulse: { distance: 100 },
                push: { particles_nb: 4 }
            }
        },
        detectRetina: true
    });

});