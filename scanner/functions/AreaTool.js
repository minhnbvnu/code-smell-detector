constructor(options) {
        super(options);
        // this.on('enable', this._afterEnable, this)
        //     .on('disable', this._afterDisable, this);
        this.translator = new Translator(this.options['language']);
        this._measureLayers = [];
    }