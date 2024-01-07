constructor(id, options) {
        super(id);
        if (!wmsExcludeParams) {
            wmsExcludeParams = extend({}, this.options);
        }
        this.wmsParams = extend({}, defaultWmsParams);
        this.setOptions(options);
        this.setZIndex(options.zIndex);
        if (!Browser.proxy) {
            this._optionsHook(options);
        }
    }