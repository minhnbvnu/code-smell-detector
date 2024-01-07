constructor(device) {

        this.device = device;

        // features
        this.cookiesEnabled = false;
        this.shadowsEnabled = false;
        this.areaLightsEnabled = false;

        // using 8 bit index so this is maximum supported number of lights
        this.maxLights = 255;

        // shared 8bit texture pixels:
        let pixelsPerLight8 = TextureIndex8.COUNT_ALWAYS;
        let pixelsPerLightFloat = 0;

        // float texture format
        if (LightsBuffer.lightTextureFormat === LightsBuffer.FORMAT_FLOAT) {
            pixelsPerLightFloat = TextureIndexFloat.COUNT;
        } else { // 8bit texture
            pixelsPerLight8 = TextureIndex8.COUNT;
        }

        // 8bit texture - to store data that can fit into 8bits to lower the bandwidth requirements
        this.lights8 = new Uint8ClampedArray(4 * pixelsPerLight8 * this.maxLights);
        this.lightsTexture8 = LightsBuffer.createTexture(this.device, pixelsPerLight8, this.maxLights, PIXELFORMAT_RGBA8, 'LightsTexture8');
        this._lightsTexture8Id = this.device.scope.resolve('lightsTexture8');

        // float texture
        if (pixelsPerLightFloat) {
            this.lightsFloat = new Float32Array(4 * pixelsPerLightFloat * this.maxLights);
            this.lightsTextureFloat = LightsBuffer.createTexture(this.device, pixelsPerLightFloat, this.maxLights, PIXELFORMAT_RGBA32F, 'LightsTextureFloat');
            this._lightsTextureFloatId = this.device.scope.resolve('lightsTextureFloat');
        } else {
            this.lightsFloat = null;
            this.lightsTextureFloat = null;
            this._lightsTextureFloatId = undefined;
        }

        // inverse sizes for both textures
        this._lightsTextureInvSizeId = this.device.scope.resolve('lightsTextureInvSize');
        this._lightsTextureInvSizeData = new Float32Array(4);
        this._lightsTextureInvSizeData[0] = pixelsPerLightFloat ? 1.0 / this.lightsTextureFloat.width : 0;
        this._lightsTextureInvSizeData[1] = pixelsPerLightFloat ? 1.0 / this.lightsTextureFloat.height : 0;
        this._lightsTextureInvSizeData[2] = 1.0 / this.lightsTexture8.width;
        this._lightsTextureInvSizeData[3] = 1.0 / this.lightsTexture8.height;

        // compression ranges
        this.invMaxColorValue = 0;
        this.invMaxAttenuation = 0;
        this.boundsMin = new Vec3();
        this.boundsDelta = new Vec3();
    }