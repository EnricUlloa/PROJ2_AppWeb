export class useLocalStorage {

    constructor(key) {
        this.key = key;
    }

    get() {
        const value = localStorage.getItem(this.key);
        if (!value) return null;
        return JSON.parse(value);
    }

    set(value) {
        localStorage.setItem(this.key, JSON.stringify(value));
    }

    remove() {
        localStorage.removeItem(this.key);
    }
}