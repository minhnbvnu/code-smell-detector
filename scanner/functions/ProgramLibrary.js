constructor(device, standardMaterial) {
        this._device = device;
        this._isClearingCache = false;
        this._precached = false;

        // Unique non-cached programs collection to dump and update game shaders cache
        this._programsCollection = [];
        this._defaultStdMatOption = new StandardMaterialOptions();
        this._defaultStdMatOptionMin = new StandardMaterialOptions();

        standardMaterial.shaderOptBuilder.updateRef(
            this._defaultStdMatOption, {}, standardMaterial, null, [], SHADER_FORWARD, null);
        standardMaterial.shaderOptBuilder.updateMinRef(
            this._defaultStdMatOptionMin, {}, standardMaterial, null, SHADER_SHADOW, null);

        device.on('destroy:shader', (shader) => {
            this.removeFromCache(shader);
        });
    }