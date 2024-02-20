function cycleToString(map) {
    var s = "";
    map.forEach(function(key) {
        if (s !== "")
            s += ", ";
        s += key;
    });
    return s;
}