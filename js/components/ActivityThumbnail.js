export const ActivityThumbnail = (activity) => {
    const $activity = document.createElement("div");
    $activity.className = "activity-thumbnail";

    if (activity.isPremium) {
        $activity.classList.add("premium");
        const $crownLabel = document.createElement("b");
        $crownLabel.innerHTML = `<span class="material-symbols-outlined">crown</span>Premium`
        $activity.appendChild($crownLabel);
    }

    const $img = document.createElement("img");
    $img.src = activity.thumbnailURL;
    $img.alt = activity.name;
    $activity.appendChild($img);

    const $name = document.createElement("h3");
    $name.innerText = activity.name;
    $activity.appendChild($name);

    const $type = document.createElement("small");
    $type.textContent = activity.type.name;
    $activity.appendChild($type);

    $activity.addEventListener("click", () => {
        window.location.replace(`/activity/preview?id=${activity.id}`);
    });

    return $activity;
}