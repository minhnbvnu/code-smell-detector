function constructorName(f, object) {
    var name = functionName(object && object.constructor);
    var excludes = f.excludeConstructors || formatio.excludeConstructors;

    var i, l;
    for (i = 0, l = excludes.length; i < l; ++i) {
        if (typeof excludes[i] === "string" && excludes[i] === name) {
            return "";
        } else if (excludes[i].test && excludes[i].test(name)) {
            return "";
        }
    }

    return name;
}