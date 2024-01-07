constructor(system, entity) {
        super(system, entity);

        // set to true by the ElementComponentSystem while
        // the component is being initialized
        this._beingInitialized = false;

        this._anchor = new Vec4();
        this._localAnchor = new Vec4();

        this._pivot = new Vec2();

        this._width = this._calculatedWidth = 32;
        this._height = this._calculatedHeight = 32;

        this._margin = new Vec4(0, 0, -32, -32);

        // the model transform used to render
        this._modelTransform = new Mat4();

        this._screenToWorld = new Mat4();

        // transform that updates local position according to anchor values
        this._anchorTransform = new Mat4();

        this._anchorDirty = true;

        // transforms to calculate screen coordinates
        this._parentWorldTransform = new Mat4();
        this._screenTransform = new Mat4();

        // the corners of the element relative to its screen component.
        // Order is bottom left, bottom right, top right, top left
        this._screenCorners = [new Vec3(), new Vec3(), new Vec3(), new Vec3()];

        // canvas-space corners of the element.
        // Order is bottom left, bottom right, top right, top left
        this._canvasCorners = [new Vec2(), new Vec2(), new Vec2(), new Vec2()];

        // the world-space corners of the element
        // Order is bottom left, bottom right, top right, top left
        this._worldCorners = [new Vec3(), new Vec3(), new Vec3(), new Vec3()];

        this._cornersDirty = true;
        this._canvasCornersDirty = true;
        this._worldCornersDirty = true;

        this.entity.on('insert', this._onInsert, this);

        this._patch();

        /**
         * The Entity with a {@link ScreenComponent} that this component belongs to. This is
         * automatically set when the component is a child of a ScreenComponent.
         *
         * @type {Entity|null}
         */
        this.screen = null;

        this._type = ELEMENTTYPE_GROUP;

        // element types
        this._image = null;
        this._text = null;
        this._group = null;

        this._drawOrder = 0;

        // Fit mode
        this._fitMode = FITMODE_STRETCH;

        // input related
        this._useInput = false;

        this._layers = [LAYERID_UI]; // assign to the default UI layer
        this._addedModels = []; // store models that have been added to layer so we can re-add when layer is changed

        this._batchGroupId = -1;
        // #if _DEBUG
        this._batchGroup = null;
        // #endif
        //

        this._offsetReadAt = 0;
        this._maskOffset = 0.5;
        this._maskedBy = null; // the entity that is masking this element
    }