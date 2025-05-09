import { PauseAppAPI } from "../js/api/PauseAppAPI.js";
import { useAuth } from "../js/hook/useAuth.js";

const displayError = (error) => {
  document.getElementById('error-message').textContent = error;
  document.getElementById('error-message').style.display = 'block';
}

document.getElementById('loginForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!email || !password) {
      displayError('Por favor, ingresa un email y una contraseña.');
      return;
  }

  const res = await PauseAppAPI.login(email, password);
  
  if (res.status !== 200) {
    displayError("Email o contraseña incorrecta.");
    return;
  }

  const { token } = res;
  console.log(res);
  useAuth.set(token);
  window.location.replace("/");
});