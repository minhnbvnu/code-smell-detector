function collectMethod(methods, object, prop, propOwner) {
    if (typeof getPropertyDescriptor(propOwner, prop).value === "function" && hasOwnProperty(object, prop)) {
        push(methods, object[prop]);
    }
}