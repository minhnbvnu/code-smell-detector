function createNonNativeDOMException (name, message) {
    return new ShimNonNativeDOMException(message, name);
}