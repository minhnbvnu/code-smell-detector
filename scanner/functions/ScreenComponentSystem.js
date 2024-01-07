constructor(app) {
        super(app);

        this.id = 'screen';

        this.ComponentType = ScreenComponent;
        this.DataType = ScreenComponentData;

        this.schema = _schema;

        this.windowResolution = new Vec2();

        // queue of callbacks
        this._drawOrderSyncQueue = new IndexedList();

        this.app.graphicsDevice.on('resizecanvas', this._onResize, this);

        this.app.systems.on('update', this._onUpdate, this);

        this.on('beforeremove', this.onRemoveComponent, this);
    }