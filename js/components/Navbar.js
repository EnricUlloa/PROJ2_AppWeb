import { useAuth } from "../hook/useAuth.js";

const pages = [
    {name: "Home", href: "/"},
    {name: "Actividades", href: "/activities"},
    {name: "Social", href: "/social"},
    {name: "Perfil", href: "/profile"},
    {name: `Premium <span class="material-symbols-outlined">crown</span>`, href: "/activities/premium"}
]

export const Navbar = () => {
    const $nav = document.createElement("nav");
    $nav.className = "navbar";
    pages.forEach((page) => {
        const $link = document.createElement("a");
        $link.href = page.href;
        $link.innerHTML = page.name;
        $nav.appendChild($link);
    });

    const $logout = document.createElement("button");
    $logout.textContent = "Cerrar sessión"
    $logout.addEventListener("click", () => {
        useAuth.remove();
        window.location.replace("/login");
    });
    $nav.appendChild($logout);

    return $nav;
}