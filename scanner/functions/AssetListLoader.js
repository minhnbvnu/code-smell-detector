constructor(assetList, assetRegistry) {
        super();
        this._assets = new Set();
        this._loadingAssets = new Set();
        this._waitingAssets = new Set();
        this._registry = assetRegistry;
        this._loading = false;
        this._loaded = false;
        this._failed = []; // list of assets that failed to load

        assetList.forEach((a) => {
            if (a instanceof Asset) {
                if (!a.registry) {
                    a.registry = assetRegistry;
                }
                this._assets.add(a);
            } else {
                const asset = assetRegistry.get(a);
                if (asset) {
                    this._assets.add(asset);
                } else {
                    this._waitForAsset(a);
                }
            }
        });
    }