import { getStressColor, getStressIcon } from "../utils/StressUtils.js"

export const StressBar = (level) => {
    const $container = document.createElement("div");
    $container.className = "stress-bar";

    const $bar = document.createElement("div");
    const pr = `${level}%`;
    $bar.style.width = pr;

    $bar.style.background = getStressColor(level);

    const $img = document.createElement("img");
    $img.src = getStressIcon(level);
    $bar.appendChild($img);

    $container.appendChild($bar);

    return $container;
}