function iterableToString(obj) {
    if (typeOf(obj) === "map") {
        return mapToString(obj);
    }

    return genericIterableToString(obj);
}