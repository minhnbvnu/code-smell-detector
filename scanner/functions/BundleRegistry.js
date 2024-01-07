constructor(assets) {
        this._assets = assets;

        // index of bundle assets
        this._bundleAssets = {};
        // index asset id to one more bundle assets
        this._assetsInBundles = {};
        // index file urls to one or more bundle assets
        this._urlsInBundles = {};
        // contains requests to load file URLs indexed by URL
        this._fileRequests = {};

        this._assets.on('add', this._onAssetAdded, this);
        this._assets.on('remove', this._onAssetRemoved, this);
    }