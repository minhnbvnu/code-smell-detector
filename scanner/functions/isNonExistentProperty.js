function isNonExistentProperty(object, property) {
    return object && typeof property !== "undefined" && !(property in object);
}