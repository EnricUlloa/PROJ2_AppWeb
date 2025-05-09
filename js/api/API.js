import { useLocalStorage } from "../hook/useLocalStorage.js";
import { authTokenKeyName } from "../config/constants.js";

export class API {
    static baseUrl = "http://localhost:8080";

    static getAuthHeaders() {
        const token = new useLocalStorage(authTokenKeyName).get();
        return token ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } : { "Content-Type": "application/json" };
    }

    static async GET(url) {
        const res = await fetch(`${this.baseUrl}${url}`, {
            method: "GET",
            headers: this.getAuthHeaders()
        });

        if (!res.ok) return { status: res.status }

        const data = await res.json();
        data.status = res.status;
        return data;
    }

    static async POST(url, body) {
        const res = await fetch(`${this.baseUrl}${url}`, {
            method: "POST",
            headers: this.getAuthHeaders(),
            body: JSON.stringify(body)
        });
    
        if (!res.ok) return { status: res.status };
    
        const data = await res.json();
    
        if (typeof data === "object" && data !== null) {
            data.status = res.status;
            return data;
        }
    
        return { data, status: res.status };
    }
    

    static async PATCH(url, body) {
        const res = await fetch(`${this.baseUrl}${url}`, {
            method: "PATCH",
            headers: this.getAuthHeaders(),
            body: JSON.stringify(body)
        });

        if (!res.ok) return { status: res.status }

        const data = await res.json();
        data.status = res.status;
        return data;
    }

    static async DELETE(url, body) {
        const res = await fetch(`${this.baseUrl}${url}`, {
            method: "DELETE",
            headers: this.getAuthHeaders(),
            body: JSON.stringify(body)
        });

        if (!res.ok) return { status: res.status }

        const data = await res.json();
        data.status = res.status;
        return data;
    }
}
