import { PauseAppAPI } from "../api/PauseAppAPI.js";

export const useIsPremium = async (id) => {
    const activity = await PauseAppAPI.getActivityById(id);
    const me = await PauseAppAPI.me();

    if (!activity.isPremium) return activity;
    
    if (!me.subscription) window.location.replace("/subscription-plan");

    return activity;
}