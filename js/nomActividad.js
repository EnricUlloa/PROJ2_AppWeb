document.addEventListener("DOMContentLoaded", function () {
    const infoBtn = document.getElementById("info-btn");
    const infoModal = document.getElementById("info-modal");
    const closeBtn = document.querySelector(".close-btn");
    const closeModalBtn = document.getElementById("close-modal-btn");

    // Mostrar el modal cuando se hace clic en el botón "Información"
    infoBtn.addEventListener("click", function () {
        infoModal.style.display = "block";
    });

    // Cerrar el modal cuando se hace clic en la "X" o en el botón "Entendido"
    closeBtn.addEventListener("click", function () {
        infoModal.style.display = "none";
    });

    closeModalBtn.addEventListener("click", function () {
        infoModal.style.display = "none";
    });

    // Cerrar el modal si se hace clic fuera de él
    window.addEventListener("click", function (e) {
        if (e.target === infoModal) {
            infoModal.style.display = "none";
        }
    });
});
