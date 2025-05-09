import { validateLogin } from "../js/utils/validateLogin.js";
import { PauseAppAPI } from "../js/api/PauseAppAPI.js"

validateLogin();

const main = async () => {
    const me = await PauseAppAPI.me();

    const byBtn = document.querySelector(".buy-button");
    byBtn.addEventListener("click", async () => {
        await PauseAppAPI.patchUser(me.id, {
            subscription: true
        });

        alert("Usuario subscrito con exito");
    })
}

main();