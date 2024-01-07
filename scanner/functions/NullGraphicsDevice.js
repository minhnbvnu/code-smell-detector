constructor(canvas, options = {}) {
        super(canvas, options);
        options = this.initOptions;

        this.isNull = true;
        this._deviceType = DEVICETYPE_NULL;
        this.samples = 1;

        Debug.log('NullGraphicsDevice');
    }