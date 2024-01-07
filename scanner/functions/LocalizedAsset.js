constructor(app) {
        super();

        this._app = app;
        app.i18n.on('set:locale', this._onSetLocale, this);

        this._autoLoad = false;
        this._disableLocalization = false;

        this._defaultAsset = null;
        this._localizedAsset = null;
    }