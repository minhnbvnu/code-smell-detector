function getGlobalObject() {
    if (typeof globalThis !== 'undefined') {
        // eslint-disable-next-line no-undef
        return globalThis;
    }
    if (typeof global !== 'undefined') {
        // eslint-disable-next-line no-undef
        return global;
    }
    if (typeof window !== 'undefined') {
        // eslint-disable-next-line no-undef
        return window;
    }
    if (typeof self !== 'undefined') {
        // eslint-disable-next-line no-undef
        return self;
    }
    return new Function('return this')();
}