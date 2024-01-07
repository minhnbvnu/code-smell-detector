constructor(layer) {
        super(layer);
        this.tilesInView = {};
        this.tilesLoading = {};
        this._parentTiles = [];
        this._childTiles = [];
        this._tileQueue = [];
        this._tileQueueIds = new Set();
        const tileSize = layer.getTileSize().width;
        this.tileCache = new LRUCache(layer.options['maxCacheSize'] * tileSize / 512 * tileSize / 512, tile => {
            this.deleteTile(tile);
        });
        if (Browser.decodeImageInWorker && this.layer.options['decodeImageInWorker'] && (layer.options['renderer'] === 'gl' || !Browser.safari && !Browser.iosWeixin)) {
            this._tileImageWorkerConn = new TileWorkerConnection();
        }
        this._compareTiles = compareTiles.bind(this);
    }