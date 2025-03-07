document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevenir el envío del formulario

  // Obtener los valores de los campos
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Validación simple de los campos (puedes agregar más validaciones)
  if (email === '' || password === '') {
      // Mostrar mensaje de error si los campos están vacíos
      document.getElementById('error-message').textContent = 'Por favor, ingresa un email y una contraseña.';
      document.getElementById('error-message').style.display = 'block';
  } else {
      // Aquí podrías agregar la lógica de autenticación real (por ejemplo, llamar a una API)
      
      // Redirigir a home.html si los datos son válidos
      window.location.href = 'home.html';
  }
});
