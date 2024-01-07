constructor(element) {
        this._element = element;
        this._entity = element.entity;
        this._system = element.system;

        // public
        this._textureAsset = null;
        this._texture = null;
        this._materialAsset = null;
        this._material = null;
        this._spriteAsset = null;
        this._sprite = null;
        this._spriteFrame = 0;
        this._pixelsPerUnit = null;
        this._targetAspectRatio = -1; // will be set when assigning textures

        this._rect = new Vec4(0, 0, 1, 1); // x, y, w, h

        this._mask = false; // this image element is a mask
        this._maskRef = 0; // id used in stencil buffer to mask

        // 9-slicing
        this._outerScale = new Vec2();
        this._outerScaleUniform = new Float32Array(2);
        this._innerOffset = new Vec4();
        this._innerOffsetUniform = new Float32Array(4);
        this._atlasRect = new Vec4();
        this._atlasRectUniform = new Float32Array(4);

        this._defaultMesh = this._createMesh();
        this._renderable = new ImageRenderable(this._entity, this._defaultMesh, this._material);

        // set default colors
        this._color = new Color(1, 1, 1, 1);
        this._colorUniform = new Float32Array([1, 1, 1]);
        this._renderable.setParameter('material_emissive', this._colorUniform);
        this._renderable.setParameter('material_opacity', 1);

        this._updateAabbFunc = this._updateAabb.bind(this);

        // initialize based on screen
        this._onScreenChange(this._element.screen);

        // listen for events
        this._element.on('resize', this._onParentResizeOrPivotChange, this);
        this._element.on('set:pivot', this._onParentResizeOrPivotChange, this);
        this._element.on('screen:set:screenspace', this._onScreenSpaceChange, this);
        this._element.on('set:screen', this._onScreenChange, this);
        this._element.on('set:draworder', this._onDrawOrderChange, this);
        this._element.on('screen:set:resolution', this._onResolutionChange, this);
    }