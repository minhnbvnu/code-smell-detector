function CommentProvider() {
        this._started = false;
        this._destroyed = false;
        this._staticSources = {};
        this._dynamicSources = {};
        this._parsers = {};
        this._targets = [];
    }