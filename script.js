const stopwatch = document.getElementById("stopwatch");
const playPauseButton = document.getElementById("play-pause");
const secondsSphere = document.getElementById("seconds-sphere");

let stopwatchInterval;
let runningTime = 0;

const playPause = () => {
    const isPaused = !playPauseButton.classList.contains("running");
    if (isPaused) {
        playPauseButton.classList.add("running");
        start();
    } else {
        playPauseButton.classList.remove("running");
        pause();
    }
};

const start = () => {
    secondsSphere.style.animation = "rotation 60s linear infinite"; //Le agrega la animacion
    let startTime = Date.now() - runningTime; //Tiempo de inicio
    secondsSphere.style.animationPlayState = "running"; //Sobreescribir el paused
    stopwatchInterval = setInterval(() => {
        runningTime = Date.now() - startTime;
        stopwatch.textContent = calculateTime(runningTime);
    }, 1000);
};

const calculateTime = (runningTime) => {
    const total_seconds = Math.floor(runningTime / 1000);
    const total_minutes = Math.floor(total_seconds / 60);

    const displaySeconds = (total_seconds % 60).toString().padStart(2, "0");
    const displayMinutes = total_minutes.toString().padStart(2, "0");

    return `${displayMinutes}:${displaySeconds}`;
};

const pause = () => {
    secondsSphere.style.animationPlayState = "paused";
    clearInterval(stopwatchInterval);
};

const stop = () => {
    secondsSphere.style.transform = "rotate(-90deg) translateX(60px)";
    secondsSphere.style.animation = "none";
    playPauseButton.classList.remove("running");
    // Importante volver a poner el running time en cero
    runningTime = 0;
    clearInterval(stopwatchInterval);
    stopwatch.textContent = "00:00";
};

//