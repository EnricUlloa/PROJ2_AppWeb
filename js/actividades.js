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
  