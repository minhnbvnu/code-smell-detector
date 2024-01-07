constructor(src, target, options) {
        super(null, options);
        if (arguments.length === 1) {
            options = src;
            src = null;
            target = null;
        }
        this._connSource = src;
        this._connTarget = target;
    }