constructor(app) {
        super(app);

        this.id = 'light';

        this.ComponentType = LightComponent;
        this.DataType = LightComponentData;

        this.on('beforeremove', this._onRemoveComponent, this);
    }