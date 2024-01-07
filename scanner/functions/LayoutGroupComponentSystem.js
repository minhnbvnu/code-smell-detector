constructor(app) {
        super(app);

        this.id = 'layoutgroup';

        this.ComponentType = LayoutGroupComponent;
        this.DataType = LayoutGroupComponentData;

        this.schema = _schema;

        this._reflowQueue = [];

        this.on('beforeremove', this._onRemoveComponent, this);

        // Perform reflow when running in the engine
        this.app.systems.on('postUpdate', this._onPostUpdate, this);
    }