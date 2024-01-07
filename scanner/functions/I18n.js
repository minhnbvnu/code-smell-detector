constructor(app) {
        super();

        this.locale = DEFAULT_LOCALE;
        this._translations = {};
        this._availableLangs = {};
        this._app = app;
        this._assets = [];
        this._parser = new I18nParser();
    }