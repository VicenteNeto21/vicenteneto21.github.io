const toggleBtn = document.getElementById('toggle-ufc-experience');
const experiences = document.getElementById('ufc-experiences');
let expanded = false;

// Aqui escondemos todas as experiências além das 3 primeiras em modo "fechado"
const allExperiences = Array.from(experiences.children);
const visibleCount = 3;

function updateDisplay() {
    allExperiences.forEach((exp, idx) => {
        if (!expanded && idx >= visibleCount) {
            exp.style.display = 'none';
        } else {
            exp.style.display = 'block';
        }
    });
    toggleBtn.textContent = expanded ? 'Ver menos' : 'Ver mais';
}

toggleBtn.addEventListener('click', () => {
    expanded = !expanded;
    updateDisplay();

    if (!expanded) {
        experiences.scrollIntoView({ behavior: 'smooth' });
    }
});

// Inicializa com 3 experiências visíveis
updateDisplay();