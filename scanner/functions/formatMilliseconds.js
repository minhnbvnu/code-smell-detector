function formatMilliseconds(time) {
    const hours = Math.floor(time / 3600).toString();
    const minutes = ("0" + Math.floor(time / 60) % 60).slice(-2);
    const seconds = ("0" + Math.floor( time % 60 )).slice(-2);
    let formatted = minutes+":"+seconds;
    if (hours !== '0') {
        formatted = hours + ":" + minutes + ":" + seconds;
    }
    formatted = formatted.replace(/\s/g,'');
    return formatted;
}