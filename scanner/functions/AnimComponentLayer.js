constructor(name, controller, component, weight = 1, blendType = ANIM_LAYER_OVERWRITE, normalizedWeight = true) {
        this._name = name;
        this._controller = controller;
        this._component = component;
        this._weight = weight;
        this._blendType = blendType;
        this._normalizedWeight = normalizedWeight;
        this._mask = null;
        this._blendTime = 0;
        this._blendTimeElapsed = 0;
        this._startingWeight = 0;
        this._targetWeight = 0;
    }