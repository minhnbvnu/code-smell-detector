constructor(name, type, file, data, options) {
        super();

        this._id = assetIdCounter--;
        this._name = name || '';

        /**
         * The type of the asset. One of ["animation", "audio", "binary", "container", "cubemap",
         * "css", "font", "json", "html", "material", "model", "render", "script", "shader", "sprite",
         * "template", "text", "texture", "textureatlas"]
         *
         * @type {("animation"|"audio"|"binary"|"container"|"cubemap"|"css"|"font"|"json"|"html"|"material"|"model"|"render"|"script"|"shader"|"sprite"|"template"|"text"|"texture"|"textureatlas")}
         */
        this.type = type;

        /**
         * Asset tags. Enables finding of assets by tags using the {@link AssetRegistry#findByTag} method.
         *
         * @type {Tags}
         */
        this.tags = new Tags(this);

        this._preload = false;
        this._file = null;
        this._data = data || { };

        /**
         * Optional JSON data that contains the asset handler options.
         *
         * @type {object}
         */
        this.options = options || { };

        // This is where the loaded resource(s) will be
        this._resources = [];

        // a string-assetId dictionary that maps
        // locale to asset id
        this._i18n = {};

        /**
         * True if the asset has finished attempting to load the resource. It is not guaranteed
         * that the resources are available as there could have been a network error.
         *
         * @type {boolean}
         */
        this.loaded = false;

        /**
         * True if the resource is currently being loaded.
         *
         * @type {boolean}
         */
        this.loading = false;

        /**
         * The asset registry that this Asset belongs to.
         *
         * @type {import('./asset-registry.js').AssetRegistry|null}
         */
        this.registry = null;

        if (file) this.file = file;
    }