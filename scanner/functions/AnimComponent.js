constructor(system, entity) {
        super(system, entity);

        this._stateGraphAsset = null;
        this._animationAssets = {};
        this._speed = 1.0;
        this._activate = true;
        this._playing = false;
        this._rootBone = null;
        this._stateGraph = null;
        this._layers = [];
        this._layerIndices = {};
        this._parameters = {};
        // a collection of animated property targets
        this._targets = {};
        this._consumedTriggers = new Set();
        this._normalizeWeights = false;
    }