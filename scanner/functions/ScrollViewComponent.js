constructor(system, entity) {
        super(system, entity);

        this._viewportReference = new EntityReference(this, 'viewportEntity', {
            'element#gain': this._onViewportElementGain,
            'element#resize': this._onSetContentOrViewportSize
        });

        this._contentReference = new EntityReference(this, 'contentEntity', {
            'element#gain': this._onContentElementGain,
            'element#lose': this._onContentElementLose,
            'element#resize': this._onSetContentOrViewportSize
        });

        this._scrollbarUpdateFlags = {};
        this._scrollbarReferences = {};
        this._scrollbarReferences[ORIENTATION_HORIZONTAL] = new EntityReference(this, 'horizontalScrollbarEntity', {
            'scrollbar#set:value': this._onSetHorizontalScrollbarValue,
            'scrollbar#gain': this._onHorizontalScrollbarGain
        });
        this._scrollbarReferences[ORIENTATION_VERTICAL] = new EntityReference(this, 'verticalScrollbarEntity', {
            'scrollbar#set:value': this._onSetVerticalScrollbarValue,
            'scrollbar#gain': this._onVerticalScrollbarGain
        });

        this._prevContentSizes = {};
        this._prevContentSizes[ORIENTATION_HORIZONTAL] = null;
        this._prevContentSizes[ORIENTATION_VERTICAL] = null;

        this._scroll = new Vec2();
        this._velocity = new Vec3();

        this._dragStartPosition = new Vec3();
        this._disabledContentInput = false;
        this._disabledContentInputEntities = [];

        this._toggleLifecycleListeners('on', system);
        this._toggleElementListeners('on');
    }