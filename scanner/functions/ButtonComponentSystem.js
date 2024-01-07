constructor(app) {
        super(app);

        this.id = 'button';

        this.ComponentType = ButtonComponent;
        this.DataType = ButtonComponentData;

        this.schema = _schema;

        this.on('beforeremove', this._onRemoveComponent, this);

        this.app.systems.on('update', this.onUpdate, this);
    }