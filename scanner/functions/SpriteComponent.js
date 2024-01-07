constructor(system, entity) {
        super(system, entity);

        this._type = SPRITETYPE_SIMPLE;
        this._material = system.defaultMaterial;
        this._color = new Color(1, 1, 1, 1);
        this._colorUniform = new Float32Array(3);
        this._speed = 1;
        this._flipX = false;
        this._flipY = false;
        this._width = 1;
        this._height = 1;

        this._drawOrder = 0;
        this._layers = [LAYERID_WORLD]; // assign to the default world layer

        // 9-slicing
        this._outerScale = new Vec2(1, 1);
        this._outerScaleUniform = new Float32Array(2);
        this._innerOffset = new Vec4();
        this._innerOffsetUniform = new Float32Array(4);
        this._atlasRect = new Vec4();
        this._atlasRectUniform = new Float32Array(4);

        // batch groups
        this._batchGroupId = -1;
        this._batchGroup = null;

        // node / mesh instance
        this._node = new GraphNode();
        this._model = new Model();
        this._model.graph = this._node;
        this._meshInstance = null;
        entity.addChild(this._model.graph);
        this._model._entity = entity;
        this._updateAabbFunc = this._updateAabb.bind(this);

        this._addedModel = false;

        // animated sprites
        this._autoPlayClip = null;

        /**
         * Dictionary of sprite animation clips.
         *
         * @type {Object<string, SpriteAnimationClip>}
         * @private
         */
        this._clips = {};

        // create default clip for simple sprite type
        this._defaultClip = new SpriteAnimationClip(this, {
            name: this.entity.name,
            fps: 0,
            loop: false,
            spriteAsset: null
        });

        /**
         * The sprite animation clip currently playing.
         *
         * @type {SpriteAnimationClip}
         * @private
         */
        this._currentClip = this._defaultClip;
    }