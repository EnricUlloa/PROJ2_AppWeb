import { Navbar } from "./js/components/Navbar.js";
import { Footer } from "./js/components/Footer.js";
import { validateLogin } from "./js/utils/validateLogin.js";
import { PauseAppAPI } from "./js/api/PauseAppAPI.js";
import { ActivityThumbnail } from "./js/components/ActivityThumbnail.js"
import { StressChart } from "./js/components/StressChart.js"

document.body.appendChild(Navbar());

validateLogin();

async function main() {
    const $recomendations = document.getElementById("recomendations");

    const actvities = await PauseAppAPI.getActivities();

    const recomended = actvities.slice(0, 20);
    recomended.forEach(a => {
        $recomendations.appendChild(ActivityThumbnail(a));
    });

    const $premium = document.getElementById("premium");

    const premium = actvities.filter(a => a.isPremium);

    premium.forEach(a => {
        $premium.appendChild(ActivityThumbnail(a));
    });

    const me = await PauseAppAPI.me();
    const $profile = document.getElementById("profile");

    const $streak = document.createElement("b");
    $streak.textContent = `Dias en racha: ${me.streakDays} ${me.streakDays > 0 ?  "🔥": ""}`;
    $profile.appendChild($streak);

    const $stressLabel = document.createElement("h3");
    $stressLabel.textContent = "Nivel de estres actual:"
    $profile.appendChild($stressLabel);

    StressChart(me.stressLevels, "profile");

    const $testLink = document.createElement("a");
    $testLink.href = "/stress-test/";
    $testLink.textContent = "Realizar test";
    $testLink.className = "button";
    $profile.appendChild($testLink);

    document.body.appendChild(Footer());
}

main();