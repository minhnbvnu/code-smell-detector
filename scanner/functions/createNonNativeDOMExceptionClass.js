function createNonNativeDOMExceptionClass () {
    /**
     * @param {string|undefined} message
     * @param {Code|LegacyCode} name
     * @returns {void}
     */
    function DOMException (message, name) {
        // const err = Error.prototype.constructor.call(this, message); // Any use to this? Won't set this.message
        this[Symbol.toStringTag] = 'DOMException';
        this._code = name in codes
            ? codes[/** @type {Code} */ (name)]
            : (legacyCodes[/** @type {LegacyCode} */ (name)] || 0);
        this._name = name || 'Error';
        // We avoid `String()` in this next line as it converts Symbols
        this._message = message === undefined ? '' : ('' + message); // eslint-disable-line no-implicit-coercion
        Object.defineProperty(this, 'code', {
            configurable: true,
            enumerable: true,
            writable: true,
            value: this._code
        });
        if (name !== undefined) {
            Object.defineProperty(this, 'name', {
                configurable: true,
                enumerable: true,
                writable: true,
                value: this._name
            });
        }
        if (message !== undefined) {
            Object.defineProperty(this, 'message', {
                configurable: true,
                enumerable: false,
                writable: true,
                value: this._message
            });
        }
    }

    // Necessary for W3C tests which complains if `DOMException` has properties on its "own" prototype

    // class DummyDOMException extends Error {}; // Sometimes causing problems in Node
    /* eslint-disable func-name-matching */
    /**
     * @class
     */
    const DummyDOMException = function DOMException () { /* */ };
    /* eslint-enable func-name-matching */
    DummyDOMException.prototype = Object.create(Error.prototype); // Intended for subclassing
    /** @type {const} */ (['name', 'message']).forEach((prop) => {
        Object.defineProperty(DummyDOMException.prototype, prop, {
            enumerable: true,
            /**
             * @this {DOMException}
             * @returns {string}
             */
            get () {
                if (!(this instanceof DOMException ||
                    // @ts-expect-error Just checking
                    this instanceof DummyDOMException ||
                    // @ts-expect-error Just checking
                    this instanceof Error)) {
                    throw new TypeError('Illegal invocation');
                }
                return this[prop === 'name' ? '_name' : '_message'];
            }
        });
    });
    // DOMException uses the same `toString` as `Error`
    Object.defineProperty(DummyDOMException.prototype, 'code', {
        configurable: true,
        enumerable: true,
        get () {
            throw new TypeError('Illegal invocation');
        }
    });
    // @ts-expect-error It's ok
    DOMException.prototype = new DummyDOMException();

    DOMException.prototype[Symbol.toStringTag] = 'DOMExceptionPrototype';
    Object.defineProperty(DOMException, 'prototype', {
        writable: false
    });

    const keys = Object.keys(codes);

    /** @type {(keyof codes)[]} */ (keys).forEach(
        (codeName) => {
            Object.defineProperty(DOMException.prototype, codeName, {
                enumerable: true,
                configurable: false,
                value: codes[codeName]
            });
            Object.defineProperty(DOMException, codeName, {
                enumerable: true,
                configurable: false,
                value: codes[codeName]
            });
        }
    );
    /** @type {(keyof legacyCodes)[]} */ (Object.keys(legacyCodes)).forEach((
        codeName
    ) => {
        Object.defineProperty(DOMException.prototype, codeName, {
            enumerable: true,
            configurable: false,
            value: legacyCodes[codeName]
        });
        Object.defineProperty(DOMException, codeName, {
            enumerable: true,
            configurable: false,
            value: legacyCodes[codeName]
        });
    });
    Object.defineProperty(DOMException.prototype, 'constructor', {
        writable: true,
        configurable: true,
        enumerable: false,
        value: DOMException
    });

    // @ts-expect-error We don't need all its properties
    return DOMException;
}