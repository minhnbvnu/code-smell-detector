function isJsonLike(str) {
    var jsonStart = str.match(JSON_START);
    return jsonStart && JSON_ENDS[jsonStart[0]].test(str);
}