function magnetically(time, closeTime) {
    if (!closeTime) return time;
    if (time > closeTime - 0.1 && closeTime + 0.1 > time) {
        return closeTime;
    }
    return time;
}