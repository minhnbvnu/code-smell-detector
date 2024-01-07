constructor(propertyName, parent, registry, callbacks, scope) {
        this.propertyName = propertyName;
        this.parent = parent;

        this._scope = scope;
        this._registry = registry;

        this.id = null;
        this.url = null;
        this.asset = null;

        this._onAssetLoad = callbacks.load;
        this._onAssetAdd = callbacks.add;
        this._onAssetRemove = callbacks.remove;
        this._onAssetUnload = callbacks.unload;
    }