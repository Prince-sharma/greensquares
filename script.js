document.addEventListener('DOMContentLoaded', (event) => {
    const projects = document.querySelectorAll('.project');
    
    projects.forEach((project, index) => {
        project.style.animation = `fadeIn 1s ease-out ${index * 0.3}s both`;
    });
});
