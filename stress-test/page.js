import { validateLogin } from "../js/utils/validateLogin.js";
import { PauseAppAPI } from "../js/api/PauseAppAPI.js"
import { Test } from "../js/components/Test.js";

main();

async function main() {
    validateLogin();
    const questions = await getQuestions();
    renderForm(questions);
}

async function getQuestions() {
    const res = await fetch("test.json");
    const data = await res.json();
    return data.test;
}

function renderForm(questions) {
    const $test = Test(questions, handleSubmit);
    document.body.appendChild($test);
}

async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    let total = 0;
    
    for (let value of formData.values()) {
        const num = Number(value);
        if (!isNaN(num)) {
            total += num;
        }
    }

    const rangeInputs = document.querySelectorAll("form > div > input[type='range']");
    rangeInputs.forEach(i => total += parseInt(i.value));
    
    total = total > 100 ? 100 : total;

    const me = await PauseAppAPI.me();

    await PauseAppAPI.addStressLevel(me.id, total);

    window.location.replace("/");
}
