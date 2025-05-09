import { ProfileIcon } from "./ProfileIcon.js";
import { PauseAppAPI } from "../api/PauseAppAPI.js";

export const UserThumbnail = ({ user, me, relation = null, canSendRequest = false }) => {
    let target = user;
    if (relation) {
        target = relation.sender;
    }

    const $user = document.createElement("div");
    $user.className = "user";
    
    const $icon = ProfileIcon(target.name);
    $user.appendChild($icon);

    const $mainData = document.createElement("div");
    $user.appendChild($mainData);

    const $name = document.createElement("b");
    $name.textContent = target.name;
    $mainData.appendChild($name);

    const $streak = document.createElement("small");
    $streak.textContent = `Racha de ${target.streakDays}`;
    $mainData.appendChild($streak);

    if (canSendRequest) {
        const $sendRequest = document.createElement("button");
        $sendRequest.textContent = "Enviar petición de amistad";
        $sendRequest.addEventListener("click", async () => {
            await PauseAppAPI.sendFriendRequest(me.id, target.id);
            $sendRequest.disabled = true;
            $user.remove();
        });
        $user.appendChild($sendRequest);
    }

    if (relation) {
        const $acceptRequest = document.createElement("button");
        $acceptRequest.innerHTML = `<span class="material-symbols-outlined">person_add</span>`;
        $acceptRequest.addEventListener("click", async () => {
            await PauseAppAPI.acceptRequest(relation.id);
            $user.remove();
        });
        $user.appendChild($acceptRequest);

        const $deleteRequest = document.createElement("button");
        $deleteRequest.innerHTML = `<span class="material-symbols-outlined">person_remove</span>`;
        $deleteRequest.addEventListener("click", async () => {
            await PauseAppAPI.deleteRelation(relation.id);
            $user.remove();
        });
        $user.appendChild($deleteRequest);
    }

    const $profile = document.createElement("button");
    $profile.textContent = "Ver perfil";
    $user.appendChild($profile);
    $profile.addEventListener("click", () => window.location.replace(`/profile?id=${target.id}`))
    
    return $user;
}