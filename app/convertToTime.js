export function convertToTime(seconds){
    let date = new Date(seconds * 1000);
    let timestr = date.toLocaleTimeString();

    return timestr
}