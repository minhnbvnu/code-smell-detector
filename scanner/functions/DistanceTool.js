constructor(options) {
        super(options);
        this.on('enable', this._afterEnable, this)
            .on('disable', this._afterDisable, this);
        this._measureLayers = [];
        this.translator = new Translator(this.options['language']);
    }