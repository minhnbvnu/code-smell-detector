constructor(app) {
        super(app);

        this.id = 'render';

        this.ComponentType = RenderComponent;
        this.DataType = RenderComponentData;

        this.schema = _schema;
        this.defaultMaterial = getDefaultMaterial(app.graphicsDevice);

        this.on('beforeremove', this.onRemove, this);
    }