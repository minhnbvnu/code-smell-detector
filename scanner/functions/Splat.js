constructor(device, numSplats, aabb) {
        this.device = device;
        this.numSplats = numSplats;
        this.aabb = aabb;

        this.vertexFormat = new VertexFormat(device, [
            { semantic: SEMANTIC_ATTR13, components: 1, type: device.isWebGL1 ? TYPE_FLOAT32 : TYPE_UINT32, asInt: !device.isWebGL1 }
        ]);

        // create data textures
        const size = this.evalTextureSize(numSplats);
        this.format = this.getTextureFormat(device, false);
        this.colorTexture = this.createTexture(device, 'splatColor', PIXELFORMAT_RGBA8, size);
        this.scaleTexture = this.createTexture(device, 'splatScale', this.format.format, size);
        this.rotationTexture = this.createTexture(device, 'splatRotation', this.format.format, size);
        this.centerTexture = this.createTexture(device, 'splatCenter', this.format.format, size);
    }