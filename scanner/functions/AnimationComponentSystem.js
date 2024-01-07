constructor(app) {
        super(app);

        this.id = 'animation';

        this.ComponentType = AnimationComponent;
        this.DataType = AnimationComponentData;

        this.schema = _schema;

        this.on('beforeremove', this.onBeforeRemove, this);
        this.app.systems.on('update', this.onUpdate, this);
    }