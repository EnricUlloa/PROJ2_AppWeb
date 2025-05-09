import { validateLogin } from "../js/utils/validateLogin.js";
import { Navbar } from "../js/components/Navbar.js";

document.body.appendChild(Navbar());

validateLogin();