constructor(component, type) {
        this._component = component;
        this.mask = new Int8Array(component.layers.length);
        this.weights = new Float32Array(component.layers.length);
        this.totalWeight = 0;
        this.counter = 0;
        this.layerCounter = 0;
        this.valueType = type;
        this.dirty = true;
        this.value = (type === AnimTargetValue.TYPE_QUAT ? [0, 0, 0, 1] : [0, 0, 0]);
        this.baseValue = null;
        this.setter = null;
    }