constructor(app) {
        super(app);

        this.id = 'model';

        this.ComponentType = ModelComponent;
        this.DataType = ModelComponentData;

        this.schema = _schema;
        this.defaultMaterial = getDefaultMaterial(app.graphicsDevice);

        this.on('beforeremove', this.onRemove, this);
    }