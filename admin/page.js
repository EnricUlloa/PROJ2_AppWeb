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
        $option.value = c.id;

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

    const $activityForm = document.getElementById("create-activity-form");
    $activityForm.addEventListener("submit", async (e) => {
        e.preventDefault(e);
        console.log(e);

        const name = e.target[0].value.trim().toLowerCase();
        const desc = e.target[1].value.trim().toLowerCase();
        const category = e.target[2].value.trim().toLowerCase();
        const thumbnail = e.target[3].files[0];
        const media = e.target[4].files[0];
        const isPremium = e.target[5].checked;
        console.log(category);
        
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", desc);
        formData.append("typeId", category);
        formData.append("thumbnail", thumbnail);
        formData.append("media", media);
        formData.append("isPremium", isPremium);

        const res = await PauseAppAPI.createActivity(formData);
        
        alert("Actividad Creada con exito");
    });
}

main();