function defineListenerProperties (obj, listeners) {
    listeners = typeof listeners === 'string' ? [listeners] : listeners;
    listeners.forEach((listener) => {
        const o = {
            get [listener] () {
                return obj['__' + listener];
            },
            /**
             * @param {AnyValue} val
             * @returns {void}
             */
            set [listener] (val) {
                obj['__' + listener] = val;
            }
        };
        const desc = /** @type {PropertyDescriptor} */ (
            Object.getOwnPropertyDescriptor(o, listener)
        );
        // desc.enumerable = true; // Default
        // desc.configurable = true; // Default // Needed by support.js in W3C IndexedDB tests (for openListeners)
        Object.defineProperty(obj, listener, desc);
    });
    listeners.forEach((l) => {
        obj[l] = null;
    });
}