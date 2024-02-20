function LocacheCache(options) {

        if (options && options.storage) {
            this.storage = options.storage;
        }

        // Re-bind the context of the two async methods so `this` is equal to
        // the instance of locache. This allows them to easily access the
        // other methods and storage objects. This is a bit of hack, and may
        // not be the best idea.
        this.async.set = bind(this.async.set, this);
        this.async.get = bind(this.async.get, this);

    }