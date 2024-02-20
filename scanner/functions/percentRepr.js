function percentRepr(value, total) {
    var percentRepr = Math.round((value / total) * 100) + "%";
    if (percentRepr === "0%") {
        percentRepr = "<1%";
    }
    return percentRepr;
}