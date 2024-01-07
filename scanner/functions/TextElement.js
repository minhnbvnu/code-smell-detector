constructor(element) {
        this._element = element;
        this._system = element.system;
        this._entity = element.entity;

        // public
        this._text = '';            // the original user-defined text
        this._symbols = [];         // array of visible symbols with unicode processing and markup removed
        this._colorPalette = [];    // per-symbol color palette
        this._outlinePalette = []; // per-symbol outline color/thickness palette
        this._shadowPalette = []; // per-symbol shadow color/offset palette
        this._symbolColors = null;  // per-symbol color indexes. only set for text with markup.
        this._symbolOutlineParams = null;  // per-symbol outline color/thickness indexes. only set for text with markup.
        this._symbolShadowParams = null;  // per-symbol shadow color/offset indexes. only set for text with markup.
        this._i18nKey = null;

        this._fontAsset = new LocalizedAsset(this._system.app);
        this._fontAsset.disableLocalization = true;
        this._fontAsset.on('load', this._onFontLoad, this);
        this._fontAsset.on('change', this._onFontChange, this);
        this._fontAsset.on('remove', this._onFontRemove, this);

        this._font = null;

        this._color = new Color(1, 1, 1, 1);
        this._colorUniform = new Float32Array(3);

        this._spacing = 1;
        this._fontSize = 32;
        this._fontMinY = 0;
        this._fontMaxY = 0;
        // the font size that is set directly by the fontSize setter
        this._originalFontSize = 32;
        this._maxFontSize = 32;
        this._minFontSize = 8;
        this._autoFitWidth = false;
        this._autoFitHeight = false;
        this._maxLines = -1;
        this._lineHeight = 32;
        this._scaledLineHeight = 32;
        this._wrapLines = false;

        this._drawOrder = 0;

        this._alignment = new Vec2(0.5, 0.5);

        this._autoWidth = true;
        this._autoHeight = true;

        this.width = 0;
        this.height = 0;

        // private
        this._node = new GraphNode();
        this._model = new Model();
        this._model.graph = this._node;
        this._entity.addChild(this._node);

        this._meshInfo = [];
        this._material = null;

        this._aabbDirty = true;
        this._aabb = new BoundingBox();

        this._noResize = false; // flag used to disable resizing events

        this._currentMaterialType = null; // save the material type (screenspace or not) to prevent overwriting
        this._maskedMaterialSrc = null; // saved material that was assigned before element was masked

        this._rtlReorder = false;
        this._unicodeConverter = false;
        this._rtl = false;              // true when the current text is RTL

        this._outlineColor = new Color(0, 0, 0, 1);
        this._outlineColorUniform = new Float32Array(4);
        this._outlineThicknessScale = 0.2; // 0.2 coefficient to map editor range of 0 - 1 to shader value
        this._outlineThickness = 0.0;

        this._shadowColor = new Color(0, 0, 0, 1);
        this._shadowColorUniform = new Float32Array(4);
        this._shadowOffsetScale = 0.005; // maps the editor scale value to shader scale
        this._shadowOffset = new Vec2(0, 0);
        this._shadowOffsetUniform = new Float32Array(2);

        this._enableMarkup = false;

        // initialize based on screen
        this._onScreenChange(this._element.screen);

        // start listening for element events
        element.on('resize', this._onParentResize, this);
        element.on('set:screen', this._onScreenChange, this);
        element.on('screen:set:screenspace', this._onScreenSpaceChange, this);
        element.on('set:draworder', this._onDrawOrderChange, this);
        element.on('set:pivot', this._onPivotChange, this);

        this._system.app.i18n.on('set:locale', this._onLocaleSet, this);
        this._system.app.i18n.on('data:add', this._onLocalizationData, this);
        this._system.app.i18n.on('data:remove', this._onLocalizationData, this);

        // substring render range
        this._rangeStart = 0;
        this._rangeEnd = 0;
    }