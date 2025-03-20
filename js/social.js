document.addEventListener("DOMContentLoaded", function () {
    const searchBar = document.querySelector(".search-bar");
    const friendCards = document.querySelectorAll(".friend-card");

    searchBar.addEventListener("input", function () {
        const searchText = searchBar.value.toLowerCase();
        
        friendCards.forEach(card => {
            const friendName = card.querySelector("h3").textContent.toLowerCase();
            
            if (friendName.includes(searchText)) {
                card.style.display = "flex"; // Mostrar si coincide
            } else {
                card.style.display = "none"; // Ocultar si no coincide
            }
        });
    });
});

