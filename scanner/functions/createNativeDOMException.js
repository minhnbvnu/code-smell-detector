function createNativeDOMException (name, message) {
    // @ts-expect-error It's ok
    return new DOMException.prototype.constructor(
        message,
        name || 'DOMException'
    );
}