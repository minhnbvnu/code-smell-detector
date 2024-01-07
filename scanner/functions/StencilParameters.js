constructor(options = {}) {
        this._func = options.func ?? FUNC_ALWAYS;
        this._ref = options.ref ?? 0;
        this._readMask = options.readMask ?? 0xFF;
        this._writeMask = options.writeMask ?? 0xFF;

        this._fail = options.fail ?? STENCILOP_KEEP; // keep == 0
        this._zfail = options.zfail ?? STENCILOP_KEEP;
        this._zpass = options.zpass ?? STENCILOP_KEEP;

        // Evaluate key here. This evaluates the key for the DEFAULT instance, which is important,
        // as during rendering it gets copied and the key would get evaluated each time.
        this._evalKey();
    }