import { strToRGB } from "../utils/strToRGB.js";

export const ProfileIcon = (username) => {
    const $icon = document.createElement("span");
    $icon.className = "material-symbols-outlined profile-icon";
    $icon.textContent = "account_circle";
    $icon.style.background = strToRGB(username);

    return $icon;
}