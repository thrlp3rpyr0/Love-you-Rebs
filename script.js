const btn = document.getElementById('decrypt-btn');
const terminal = document.getElementById('terminal-container');
const heartContainer = document.getElementById('heart-container');

function triggerHeart() {
    terminal.style.display = 'none';
    heartContainer.style.display = 'block';

    const points = [];
    const minDim = Math.min(window.innerWidth, window.innerHeight);
    // Escala grande para que ocupe gran parte de la pantalla
    const scale = minDim / 32; 

    // Algoritmo balanceado: Contorno detallado y relleno limpio (no saturado)
    for (let t = 0; t < Math.PI * 2; t += 0.05) {
        let x = 16 * Math.pow(Math.sin(t), 3);
        let y = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
        
        // Relleno interno espaciado de forma óptima
        for (let r = 0.2; r <= 0.95; r += 0.15) {
            points.push({
                x: x * r,
                y: y * r
            });
        }
    }

    // Mezclar aleatoriamente para que se dibuje de forma orgánica por todas partes
    points.sort(() => Math.random() - 0.5);

    const spanElements = [];
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    // Crear los elementos DOM ocultos
    points.forEach(p => {
        const span = document.createElement('span');
        span.classList.add('floating-text');
        span.innerText = "I love you";

        span.style.left = `${centerX + p.x * scale}px`;
        span.style.top = `${centerY + p.y * scale}px`;

        heartContainer.appendChild(span);
        spanElements.push(span);
    });

    // Mostrar lentamente y de manera fluida
    let index = 0;
    const drawInterval = setInterval(() => {
        // Cantidad pequeña por frame para lograr el efecto de llenado lento
        for (let i = 0; i < 2 && index < spanElements.length; i++, index++) {
            spanElements[index].classList.add('visible');
        }

        if (index >= spanElements.length) {
            clearInterval(drawInterval);
            // Una vez lleno por completo, comienza a latir suavemente
            setTimeout(() => {
                heartContainer.classList.add('beating');
            }, 400);
        }
    }, 45); // Velocidad pausada para apreciar cómo se va formando poco a poco
}

btn.addEventListener('click', triggerHeart);
document.body.addEventListener('click', (e) => {
    if(e.target !== btn && terminal.style.display !== 'none') {
        triggerHeart();
    }
});
