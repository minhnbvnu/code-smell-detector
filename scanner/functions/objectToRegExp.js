function objectToRegExp(obj) {
    return stringToRegExp(obj.expression, obj.flags);
}