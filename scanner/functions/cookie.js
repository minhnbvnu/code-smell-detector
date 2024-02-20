function cookie(name, value, iDay) {
    if (arguments.length === 1) {
        return getCookie(name);
    }
    else {
        setCookie(name, value, iDay);
    }
}