function getPropertyNames(obj) {
    var table = Object.create(null, {});
    while (obj) {
        var names = Object.getOwnPropertyNames(obj);
        for (var i = 0, n = names.length; i < n; i++)
            table[names[i]] = true;
        obj = Object.getPrototypeOf(obj);
    }
    return Object.keys(table);
}