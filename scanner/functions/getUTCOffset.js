function getUTCOffset() {
    return Math.round((-1 * new Date().getTimezoneOffset()) / 60);
}