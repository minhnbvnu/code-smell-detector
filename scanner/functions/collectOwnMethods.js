function collectOwnMethods(object) {
    var methods = [];

    walk(object, collectMethod.bind(null, methods, object));

    return methods;
}