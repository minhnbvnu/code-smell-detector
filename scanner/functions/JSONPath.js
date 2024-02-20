function JSONPath (opts, expr, obj, callback, otherTypeCallback) {
    // eslint-disable-next-line no-restricted-syntax
    if (!(this instanceof JSONPath)) {
        try {
            return new JSONPath(opts, expr, obj, callback, otherTypeCallback);
        } catch (e) {
            if (!e.avoidNew) {
                throw e;
            }
            return e.value;
        }
    }

    if (typeof opts === 'string') {
        otherTypeCallback = callback;
        callback = obj;
        obj = expr;
        expr = opts;
        opts = null;
    }
    const optObj = opts && typeof opts === 'object';
    opts = opts || {};
    this.json = opts.json || obj;
    this.path = opts.path || expr;
    this.resultType = opts.resultType || 'value';
    this.flatten = opts.flatten || false;
    this.wrap = hasOwnProp.call(opts, 'wrap') ? opts.wrap : true;
    this.sandbox = opts.sandbox || {};
    this.preventEval = opts.preventEval || false;
    this.parent = opts.parent || null;
    this.parentProperty = opts.parentProperty || null;
    this.callback = opts.callback || callback || null;
    this.otherTypeCallback = opts.otherTypeCallback ||
        otherTypeCallback ||
        function () {
            throw new TypeError(
                'You must supply an otherTypeCallback callback option ' +
                'with the @other() operator.'
            );
        };

    if (opts.autostart !== false) {
        const args = {
            path: (optObj ? opts.path : expr)
        };
        if (!optObj) {
            args.json = obj;
        } else if ('json' in opts) {
            args.json = opts.json;
        }
        const ret = this.evaluate(args);
        if (!ret || typeof ret !== 'object') {
            throw new NewError(ret);
        }
        return ret;
    }
}