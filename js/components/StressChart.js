export const StressChart = (stressLevels, container) => {
    const $canvas = document.createElement("canvas");
    $canvas.id = "stress-chart";

    document.getElementById(container).appendChild($canvas);

    const xLabels = stressLevels.map(s => s.date.slice(0, 10));
    const yValues = stressLevels.map(s => s.level);

    new Chart($canvas.getContext("2d"), {
        type: "bar",
        data: {
            labels: xLabels,
            datasets: [
                {
                    label: "Nivel de estres",
                    backgroundColor: "#fff",
                    data: yValues,
                    borderWidth: 2,
                    borderRadius: 8,
                    borderSkipped: false
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false },
                title: {
                    display: true,
                    text: "Stress Level",
                    color: "#fff"
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    suggestedMax: 100,
                    ticks: { color: "#fff" }
                },
                x: {
                    ticks: { color: "#fff" }
                }
            }
        }
    });
};