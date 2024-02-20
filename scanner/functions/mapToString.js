function mapToString(map) {
    var representation = "";

    /* eslint-disable-next-line local-rules/no-prototype-methods */
    map.forEach(function(value, key) {
        representation += "[" + stringify(key) + "," + stringify(value) + "],";
    });

    representation = slice(representation, 0, -1);
    return representation;
}