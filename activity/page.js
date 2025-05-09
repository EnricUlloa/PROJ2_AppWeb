import { PauseAppAPI } from "../js/api/PauseAppAPI.js";
import { validateLogin } from "../js/utils/validateLogin.js";
import { Navbar } from "../js/components/Navbar.js";
import { static_uri } from "../js/config/constants.js";
import { Timer } from "../js/components/Timer.js";

validateLogin();

document.body.appendChild(Navbar());

const params = new URLSearchParams(window.location.search);
if (params.has("id") == false) throw new Error("Empty activity id");

const id = params.get("id");

async function main() {
    const activity = await PauseAppAPI.getActivityById(id);
    const me = await PauseAppAPI.me();

    const exists = await PauseAppAPI.recordExists({userId: me.id, activityId: activity.id});

    if (!exists.data) {
        await PauseAppAPI.createActivityRecord({
            userId: me.id,
            activityId: id,
            status: false
        });
    }

    const $media = document.getElementById("media");
    $media.src = static_uri + activity.media.url;

    const $name = document.getElementById("name");
    $name.textContent = activity.name;

    const $footer = document.createElement("footer");

    $footer.appendChild(Timer());

    const $completeBtn = document.createElement("button");
    $completeBtn.textContent = "Terminar actividad";

    $completeBtn.addEventListener("click", async () => {
        await PauseAppAPI.completeActivity({ userId: me.id, activityId: activity.id });
    });

    $footer.appendChild($completeBtn);

    document.querySelector("main").appendChild($footer);
}

main();