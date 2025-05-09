import { validateLogin } from "../js/utils/validateLogin.js";
import { PauseAppAPI } from "../js/api/PauseAppAPI.js";

validateLogin();

const renderCategoryOptions = async ()  => {
    const categories = await PauseAppAPI.getActivityTypes();
    const $selector = document.getElementById("atype-selector");
    $selector.innerHTML = "";

    categories.forEach(c => {
        const $option = document.createElement("option");
        $option.textContent = c.name;

        $selector.appendChild($option);
    });
}

async function main() {
    const $activityTable = document.getElementById("activity-table");
    renderCategoryOptions();

    const activities = await PauseAppAPI.getActivities();
    activities.forEach((activity, idx) => {
        const $div = document.createElement("div");
        if (idx%2==0) $div.style.background = "var(--purple)";

        const $span = document.createElement("span");
        $span.textContent = activity.id;
        $div.appendChild($span);

        const $input = document.createElement("b");
        $input.textContent = activity.name;
        $div.appendChild($input);

        const $editBtn = document.createElement("button");
        $editBtn.textContent = "Editar";
        $div.appendChild($editBtn);

        const $deleteBtn = document.createElement("button");
        $deleteBtn.textContent = "Eliminar";
        $div.appendChild($deleteBtn);

        $activityTable.appendChild($div);
    });

    const $categoryForm = document.getElementById("create-atype-form");

    $categoryForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const name = e.target[0].value?.trim();
        if (!name) return;

        const res = await PauseAppAPI.createActivityType(name);

        if (res.status === 201) {
            alert("Categoria creada correctamente");
            renderCategoryOptions();
        } else {
            alert("Error al crear categoria");
        }
    });
}

main();