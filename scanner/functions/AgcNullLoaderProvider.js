function AgcNullLoaderProvider(){
        this._hasTrigger = false;
        this._libraryOverride = null;
        this._triggerFunction = (function(){
            // If the trigger function is called before $get,
            // just act as if it was never fetched.
            if (this._deferred)
                this._deferred.resolve(this._libraryOverride || google);
            else
                this._hasTrigger = false;
        }).bind(this);
        this._deferred = null;
    }