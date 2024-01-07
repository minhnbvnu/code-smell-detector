constructor(system, entity) {
        super(system, entity);

        this._visualState = VisualState.DEFAULT;
        this._isHovering = false;
        this._hoveringCounter = 0;
        this._isPressed = false;

        this._defaultTint = new Color(1, 1, 1, 1);
        this._defaultSpriteAsset = null;
        this._defaultSpriteFrame = 0;

        this._imageReference = new EntityReference(this, 'imageEntity', {
            'element#gain': this._onImageElementGain,
            'element#lose': this._onImageElementLose,
            'element#set:color': this._onSetColor,
            'element#set:opacity': this._onSetOpacity,
            'element#set:spriteAsset': this._onSetSpriteAsset,
            'element#set:spriteFrame': this._onSetSpriteFrame
        });

        this._toggleLifecycleListeners('on', system);
    }