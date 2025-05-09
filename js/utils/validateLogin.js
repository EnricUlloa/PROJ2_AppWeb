import { useAuth } from "../hook/useAuth.js";


export const validateLogin = () => {
    const token = useAuth.get();
    if (!token) window.location.replace("/login");
}