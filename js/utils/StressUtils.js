import { StressColors, StressIcons } from "../config/constants.js";

export const getStressColor = (level) => {
    if (level >= 70) return StressColors.angry; 
    if (level >= 50) return StressColors.normal;
    return StressColors.happy; 
}

export const getStressIcon = (level) => {
    if (level >= 70) return StressIcons.angry; 
    if (level >= 50) return StressIcons.normal;
    return StressIcons.happy; 
}