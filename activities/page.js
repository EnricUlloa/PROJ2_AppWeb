import { Navbar } from "../js/components/Navbar.js";
import { PauseAppAPI } from "../js/api/PauseAppAPI.js";
import { validateLogin } from "../js/utils/validateLogin.js";
import { ActivityThumbnail } from "../js/components/ActivityThumbnail.js";

validateLogin();

class Filter {

    static activities = [];

    static nameFilter = "";

    static typeFilter = [];

    static getFiltredActivities() {
        let filtred = Filter.activities;

        if (Filter.nameFilter !== "") filtred = filtred.filter(a => a.name.toLowerCase().includes(Filter.nameFilter));

        if (Filter.typeFilter.length != 0) filtred = filtred.filter(a => Filter.typeFilter.includes(a.type.id));

        return filtred;
    }
}

const renderActivities = () => {
    $activityContainer.innerHTML = "";
    Filter.getFiltredActivities().forEach(activity => $activityContainer.appendChild(ActivityThumbnail(activity)));
}

const renderActivityTypes = (types) => {
    const $activityTypeSelector = document.getElementById("activity-types");
    $activityTypeSelector.innerHTML = "";

    const fragment = document.createDocumentFragment();

    const $clearFilter = document.createElement("button");
    $clearFilter.textContent = "Limpiar filtro";
    $clearFilter.addEventListener("click", () => {
        Filter.typeFilter = [];
        renderActivityTypes(types);
        renderActivities();
    });
    fragment.appendChild($clearFilter);

    types.forEach(type => {
        const $type = document.createElement("button");
        $type.textContent = type.name;

        $type.addEventListener("click", () => {
            const idx = Filter.typeFilter.indexOf(type.id);

            if (idx != -1) {
                Filter.typeFilter = Filter.typeFilter.filter(a => a !== type.id);
                $type.classList.remove("selected");
            } else {
                $type.className = "selected";
                Filter.typeFilter.push(type.id);
            }

            renderActivities();
        });

        fragment.appendChild($type);
    });

    $activityTypeSelector.appendChild(fragment);
}

document.body.appendChild(Navbar());

const $activityInput = document.getElementById("activity-input");

$activityInput.addEventListener("input", (e) => {
    Filter.nameFilter = e.target.value.toLowerCase().trim();
    renderActivities();
});

const $activityContainer = document.querySelector("main");

PauseAppAPI.getActivityTypes().then(types => {
    renderActivityTypes(types);
});

PauseAppAPI.getActivities().then(activities => {
    Filter.activities = activities;
    renderActivities();
});
