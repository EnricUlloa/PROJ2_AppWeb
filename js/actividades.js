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

/* Agregar evento de redirección al hacer clic en una tarjeta
const activityCards = document.querySelectorAll(".activity-card");

activityCards.forEach(card => {
    card.addEventListener("click", () => {
        let activityName = card.innerText.trim(); // Obtener el nombre de la actividad
        let formattedName = activityName.replace(/\s+/g, '_'); // Reemplazar espacios por guiones bajos
        window.location.href = `nomActividad.html?actividad=${formattedName}`;
    });
});
*/

//NEO - CODIGO
document.addEventListener("DOMContentLoaded", function () {
  function filterActivities() {
    let input = document.getElementById("searchInput").value.toLowerCase();
    let cards = document.querySelectorAll(".activity-card");

    cards.forEach(card => {
      let activityName = card.innerText.toLowerCase();
      card.style.display = activityName.includes(input) ? "block" : "none";
    });
  }

  function filterByTag(tag) {
    let cards = document.querySelectorAll(".activity-card");

    cards.forEach(card => {
      let activityType = card.getAttribute("data-tag");
      card.style.display = (tag === "Todas" || activityType === tag) ? "block" : "none";
    });
  }

  // -------------------- MODAL DE SUBSCRIPCIÓN --------------------

  // Obtener el modal y el botón de cerrar
  const modal = document.getElementById("subscriptionModal");
  const closeModal = document.getElementById("closeModal");

  // Asegurarnos de que el modal existe antes de hacer cualquier acción
  if (modal && closeModal) {
    // Seleccionar las tarjetas de actividad
    const activityCards = document.querySelectorAll(".activity-card");

    // Seleccionar solo las dos últimas tarjetas
    const lastTwoCards = Array.from(activityCards).slice(-2);

    // Función para abrir el modal
    function openSubscriptionModal() {
      modal.style.display = "flex"; // Mostrar modal
    }

    // Función para cerrar el modal
    function closeSubscriptionModal() {
      modal.style.display = "none";
    }

    // Agregar evento de clic solo a las dos últimas tarjetas
    lastTwoCards.forEach(card => {
      card.addEventListener("click", (event) => {
        event.preventDefault(); // Evitar redirección
        openSubscriptionModal();
      });
    });

    // Evento para cerrar el modal cuando se haga clic en la "X"
    closeModal.addEventListener("click", closeSubscriptionModal);

    // Cerrar modal si se hace clic fuera del contenido
    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        closeSubscriptionModal();
      }
    });

    // Asegurar que el modal está oculto al inicio
    modal.style.display = "none";
  }
});