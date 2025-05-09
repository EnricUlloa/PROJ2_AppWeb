export const Timer = () => {
    const $timer = document.createElement("div");
    $timer.className = "timer";
    
    const $time = document.createElement("span");
    $time.textContent = "00:00:00";
    
    const $togglePlay = document.createElement("button");
    $togglePlay.textContent = "Start";
    
    const $reset = document.createElement("button");
    $reset.textContent = "Reset";
    
    $timer.appendChild($time);
    $timer.appendChild($togglePlay);
    $timer.appendChild($reset);
    
    let playStatus = false;
    let seconds = 0;
    let interval;

    const formatTime = (secs) => {
        const hrs = String(Math.floor(secs / 3600)).padStart(2, '0');
        const mins = String(Math.floor((secs % 3600) / 60)).padStart(2, '0');
        const secsStr = String(secs % 60).padStart(2, '0');
        return `${hrs}:${mins}:${secsStr}`;
    };

    const updateTime = () => {
        $time.textContent = formatTime(seconds);
    };

    $togglePlay.addEventListener("click", () => {
        if (playStatus) {
            clearInterval(interval);
            $togglePlay.textContent = "Start";
        } else {
            interval = setInterval(() => {
                seconds++;
                updateTime();
            }, 1000);
            $togglePlay.textContent = "Pause";
        }
        playStatus = !playStatus;
    });

    $reset.addEventListener("click", () => {
        clearInterval(interval);
        seconds = 0;
        updateTime();
        $togglePlay.textContent = "Start";
        playStatus = false;
    });
    
    return $timer;
};