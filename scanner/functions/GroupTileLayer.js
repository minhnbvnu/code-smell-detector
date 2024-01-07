constructor(id, layers, options) {
        super(id, options);
        this.layers = layers || [];
        this._checkChildren();
        this.layerMap = {};
        this._groupChildren = [];
    }