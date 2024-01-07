constructor(app) {
        super(app);

        this.id = 'zone';

        this.ComponentType = ZoneComponent;
        this.DataType = ZoneComponentData;

        this.schema = _schema;

        this.on('beforeremove', this._onBeforeRemove, this);
    }