function reverseDict(dict) {
    var result = {};
    for (var key in dict) {
        result[dict[key]] = parseInt(key);
    }

    return result;
}