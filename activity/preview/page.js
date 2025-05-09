import { validateLogin } from "../../js/utils/validateLogin.js";
import { Navbar } from "../../js/components/Navbar.js";
import { useIsPremium } from "../../js/hook/useIsPremium.js"

validateLogin();

document.body.appendChild(Navbar());

const params = new URLSearchParams(window.location.search);
if (params.has("id") == false) throw new Error("Empty activity id");

const id = params.get("id");

async function main() {
    const activity = await useIsPremium(id);
    const $name = document.getElementById("activity-name");

    document.title = `Preview - ${activity.name}`;
    $name.textContent = activity.name;

    const $desc = document.getElementById("activity-desc");
    $desc.textContent = activity.description;

    const $link = document.getElementById("activity-link");
    $link.href = `/activity?id=${activity.id}`;

    const $img = document.getElementById("activity-img");
    $img.src = activity.thumbnailURL;
}

main();
