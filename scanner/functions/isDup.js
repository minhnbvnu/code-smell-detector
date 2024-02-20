function isDup(obj, dupGuard) {
    if(typeof obj === "object") {
        if(-1 !== dupGuard.indexOf(obj)) {
            return true;
        }
        dupGuard.push(obj);
    }
    return false;
}