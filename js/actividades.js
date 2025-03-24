function filterActivities() {
    let input = document.getElementById("searchInput").value.toLowerCase();
    let cards = document.querySelectorAll(".activity-card");
  
    cards.forEach(card => {
      let activityName = card.innerText.toLowerCase();
      if (activityName.includes(input)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  }
  
  function filterByTag(tag) {
    let cards = document.querySelectorAll(".activity-card");
  
    cards.forEach(card => {
      let activityType = card.getAttribute("data-tag"); // Suponiendo que cada tarjeta tiene un atributo data-tag
      if (tag === "Todas" || activityType === tag) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  }

// Agregar evento de redirección al hacer clic en una tarjeta
const activityCards = document.querySelectorAll(".activity-card");

activityCards.forEach(card => {
    card.addEventListener("click", () => {
        let activityName = card.innerText.trim(); // Obtener el nombre de la actividad
        let formattedName = activityName.replace(/\s+/g, '_'); // Reemplazar espacios por guiones bajos
        window.location.href = `nomActividad.html?actividad=${formattedName}`;
    });
});
