function getDumpURL() {
    let url = new URL(window.location.href);
    let params = new URLSearchParams(url.search);
    params.set("utcoffset", getUTCOffset());
    return "/dump?" + params.toString();
}