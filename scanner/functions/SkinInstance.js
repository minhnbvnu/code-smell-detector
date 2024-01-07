constructor(skin) {
        this._dirty = true;

        // optional root bone - used for cache lookup, not used for skinning
        this._rootBone = null;

        // sequential index of when the bone update was performed the last time
        this._skinUpdateIndex = -1;

        // true if bones need to be updated before the frustum culling (bones are needed to update bounds of the MeshInstance)
        this._updateBeforeCull = true;

        if (skin) {
            this.initSkin(skin);
        }
    }