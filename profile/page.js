import { Navbar } from "../js/components/Navbar.js";
import { validateLogin } from "../js/utils/validateLogin.js";
import { PauseAppAPI } from "../js/api/PauseAppAPI.js";
import { StressChart } from "../js/components/StressChart.js";
import { ProfileIcon } from "../js/components/ProfileIcon.js"
import { StressBar } from "../js/components/StressBar.js";
import { ActivityThumbnail } from "../js/components/ActivityThumbnail.js"


async function renderCompletedActivities(records) {
    const $container = document.getElementById("activity-records");
    
    const completed = records.reverse().filter(record => record.status === true);

    if (completed.length === 0) return;

    const $title = document.createElement("h2");
    $title.textContent = "Actividades Completadas";
    $container.appendChild($title);

    completed.forEach(record => {
        const { activity } = record;
        
        $container.appendChild(ActivityThumbnail(activity));
    });
}

async function renderUnCompletedActivities(records) {
    const $container = document.getElementById("activity-records");
    
    const uncompleted = records.reverse().filter(record => record.status === false);

    if (uncompleted.length === 0) return;

    const $title = document.createElement("h2");
    $title.textContent = "Actividades sin completar";
    $container.appendChild($title);

    uncompleted.forEach(record => {
        const { activity } = record;
        
        $container.appendChild(ActivityThumbnail(activity));
    });   
}

async function main() {
    validateLogin();
    document.body.appendChild(Navbar());
    const params = new URLSearchParams(window.location.search);
    const me = await PauseAppAPI.me();
    let user = null;

    const userIsNotMe = params.has("id") && params.get("id") != me.id;
    if (userIsNotMe) {
        const id = params.get("id");
        user = await PauseAppAPI.getUser(id);
    } else {
        user = me
        const $modal = document.getElementById("modal");
        $modal.showModal();
        
        document.getElementById("closeModalBtn").addEventListener("click", () => $modal.close());
    }


    const $aside = document.querySelector("aside")
    $aside.appendChild(ProfileIcon(user.name));
    
    const $name = document.createElement("h2");
    $name.textContent = user.name;
    $aside.appendChild($name);
    
    const $numOfActivitiesDone = document.createElement("h3");
    $numOfActivitiesDone.textContent = `Actividades realizadas: ${user.completedActivities}`;
    $aside.appendChild($numOfActivitiesDone);

    const $streak = document.createElement("h3");
    $streak.textContent = `Dias en racha: ${user.streakDays} ${user.streakDays > 0 ?  "🔥": ""}`;
    $aside.appendChild($streak);

    const $initLabel = document.createElement("h4");
    $initLabel.textContent = "Nivel de estres inicial:";
    $aside.appendChild($initLabel);

    $aside.appendChild(StressBar(user.stressLevels[0].level));

    const $actualLabel = document.createElement("h4");
    $actualLabel.textContent = "Nivel de estres actual:";
    $aside.appendChild($actualLabel);

    $aside.appendChild(StressBar(user.stressLevels[user.stressLevels.length -1].level));

    StressChart(user.stressLevels, "stress");

    renderCompletedActivities(user.activityRecords);
    renderUnCompletedActivities(user.activityRecords);
}

main();