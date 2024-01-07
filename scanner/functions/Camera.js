constructor() {
        this._aspectRatio = 16 / 9;
        this._aspectRatioMode = ASPECT_AUTO;
        this._calculateProjection = null;
        this._calculateTransform = null;
        this._clearColor = new Color(0.75, 0.75, 0.75, 1);
        this._clearColorBuffer = true;
        this._clearDepth = 1;
        this._clearDepthBuffer = true;
        this._clearStencil = 0;
        this._clearStencilBuffer = true;
        this._cullFaces = true;
        this._farClip = 1000;
        this._flipFaces = false;
        this._fov = 45;
        this._frustumCulling = true;
        this._horizontalFov = false;
        this._layers = [LAYERID_WORLD, LAYERID_DEPTH, LAYERID_SKYBOX, LAYERID_UI, LAYERID_IMMEDIATE];
        this._layersSet = new Set(this._layers);
        this._nearClip = 0.1;
        this._node = null;
        this._orthoHeight = 10;
        this._projection = PROJECTION_PERSPECTIVE;
        this._rect = new Vec4(0, 0, 1, 1);
        this._renderTarget = null;
        this._scissorRect = new Vec4(0, 0, 1, 1);
        this._scissorRectClear = false; // by default rect is used when clearing. this allows scissorRect to be used when clearing.
        this._aperture = 16.0;
        this._shutter = 1.0 / 1000.0;
        this._sensitivity = 1000;

        this._projMat = new Mat4();
        this._projMatDirty = true;
        this._projMatSkybox = new Mat4(); // projection matrix used by skybox rendering shader is always perspective
        this._viewMat = new Mat4();
        this._viewMatDirty = true;
        this._viewProjMat = new Mat4();
        this._viewProjMatDirty = true;

        this.frustum = new Frustum();

        // Set by XrManager
        this._xr = null;
        this._xrProperties = {
            horizontalFov: this._horizontalFov,
            fov: this._fov,
            aspectRatio: this._aspectRatio,
            farClip: this._farClip,
            nearClip: this._nearClip
        };
    }