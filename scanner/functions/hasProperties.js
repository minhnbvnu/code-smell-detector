function hasProperties(ob) {
    if (typeof(ob) === "string")
        return false;

    try {
        // eslint-disable-next-line no-unused-vars
        for (var name in ob)
            return true;
    } catch (exc) {}
    return false;
}