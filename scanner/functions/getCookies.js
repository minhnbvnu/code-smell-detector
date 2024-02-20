function getCookies() {
    return document.cookie === '' ? [] : document.cookie.split(';').map(x => x.trim());

}