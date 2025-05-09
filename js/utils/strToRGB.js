export function strToRGB(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    let r = (hash >> 16) & 255;
    let g = (hash >> 8) & 255;
    let b = hash & 255;
    
    return `rgb(${r}, ${g}, ${b})`;
}