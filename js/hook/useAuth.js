import { useLocalStorage } from "./useLocalStorage.js"
import { authTokenKeyName } from "../config/constants.js";

export const useAuth = new useLocalStorage(authTokenKeyName);