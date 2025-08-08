document.addEventListener('DOMContentLoaded', () => {
    const projects = [
        {
            title: 'nibi language',
            description: '> A lisp-inspired programming language\n> Designed for embedded scripting\n> Features modern language concepts',
            link: 'https://github.com/nibi-lang/nibi'
        },
        {
            title: 'active deformable models',
            description: '> Research implementation of active contours\n> Computer vision algorithms\n> Image processing techniques',
            link: 'https://github.com/bosley/Active-Contours'
        },
        {
            title: 'λ virtual machine',
            description: '> Rust-based virtual machine\n> Custom instruction set\n> High-performance execution',
            link: 'https://gitlab.com/lambdavm/lvm'
        },
        {
            title: 'astro+skiff',
            description: '> C++ virtual machine implementation\n> Custom bytecode format\n> Runtime optimization',
            link: 'https://github.com/astroskiff'
        },
        {
            title: 'first compiler',
            description: '> CSCI3xx project\n> Complete compiler implementation\n> Custom language design',
            link: 'https://github.com/bosley/UNAS-Interpreter'
        }
    ];

    const projectsGrid = document.getElementById('projects-grid');
    
    projects.forEach((project, index) => {
        setTimeout(() => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.innerHTML = `
                <h3 class="project-title">> ${project.title}</h3>
                <div class="project-description">${project.description.replace(/\n/g, '<br>')}</div>
                <a href="${project.link}" class="project-link" target="_blank">> View Source</a>
            `;
            projectsGrid.appendChild(card);
        }, index * 100); // Stagger the appearance of cards
    });
});
