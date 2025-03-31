// Variables globales
let timer;
let isRunning = false;
let milliseconds = 0, seconds = 0, minutes = 0, hours = 0;

// Función para actualizar la pantalla
function updateDisplay() {
    document.getElementById("display").textContent = 
        (hours < 10 ? "0" : "") + hours + " : " + 
        (minutes < 10 ? "0" : "") + minutes + " : " + 
        (seconds < 10 ? "0" : "") + seconds + " : " + 
        (milliseconds < 10 ? "0" : "") + milliseconds;
}

// Función para iniciar el temporizador
function start() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(() => {
            milliseconds += 1;
            if (milliseconds === 100) { // Cada 100ms sumamos 1 segundo
                milliseconds = 0;
                seconds++;
            }
            if (seconds === 60) {
                seconds = 0;
                minutes++;
            }
            if (minutes === 60) {
                minutes = 0;
                hours++;
            }
            updateDisplay();
        }, 10); // Se ejecuta cada 10 milisegundos
    }
}

// Función para detener el temporizador
function stop() {
    clearInterval(timer);
    isRunning = false;
}

// Función para reiniciar el temporizador
function reset() {
    clearInterval(timer);
    isRunning = false;
    milliseconds = 0;
    seconds = 0;
    minutes = 0;
    hours = 0;
    updateDisplay();
}

// Inicializar pantalla con "00:00:00:00"
updateDisplay();
