import { PauseAppAPI } from "../js/api/PauseAppAPI.js";
import { useAuth } from "../js/hook/useAuth.js";

const displayError = (error) => {
    document.getElementById('error-message').textContent = error;
    document.getElementById('error-message').style.display = 'block';
}

document.getElementById("registerForm").addEventListener("submit",async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const passwordConfirmation = document.getElementById("password-confirmation").value.trim();

    if (!name || !email || !password || !passwordConfirmation) {
        displayError("Porfavor completa todos los campos");
        return;
    }

    if (password !== passwordConfirmation) {
        displayError("Las contraseñas no coinciden");
        return;
    }

    const res = await PauseAppAPI.register(name, email, password);
    
    console.log(res);
    if (res.status === 400) {
        displayError("El email ya esta en uso");
        return;
    }

    const { token } = res;
    useAuth.set(token);
    window.location.replace("/stress-test");
});