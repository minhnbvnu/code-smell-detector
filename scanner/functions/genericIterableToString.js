function genericIterableToString(iterable) {
    var representation = "";

    /* eslint-disable-next-line local-rules/no-prototype-methods */
    iterable.forEach(function(value) {
        representation += stringify(value) + ",";
    });

    representation = slice(representation, 0, -1);
    return representation;
}