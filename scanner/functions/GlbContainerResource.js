constructor(data, asset, assets, defaultMaterial) {
        const createAsset = function (type, resource, index) {
            const subAsset = GlbContainerResource.createAsset(asset.name, type, resource, index);
            assets.add(subAsset);
            return subAsset;
        };

        // render assets
        const renders = [];
        for (let i = 0; i < data.renders.length; ++i) {
            renders.push(createAsset('render', data.renders[i], i));
        }

        // create material assets
        const materials = [];
        for (let i = 0; i < data.materials.length; ++i) {
            materials.push(createAsset('material', data.materials[i], i));
        }

        // create animation assets
        const animations = [];
        for (let i = 0; i < data.animations.length; ++i) {
            animations.push(createAsset('animation', data.animations[i], i));
        }

        this.data = data;
        this._model = null;
        this._assetName = asset.name;
        this._assets = assets;
        this._defaultMaterial = defaultMaterial;
        this.renders = renders;
        this.materials = materials;
        this.textures = data.textures; // texture assets are created directly
        this.animations = animations;
    }