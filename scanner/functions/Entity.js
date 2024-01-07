constructor(name, app = getApplication()) {
        super(name);

        Debug.assert(app, 'Could not find current application');
        this._app = app;
    }