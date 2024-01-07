constructor(app) {
        super(app);

        this.id = 'camera';

        this.ComponentType = CameraComponent;
        this.DataType = CameraComponentData;

        this.schema = _schema;

        this.on('beforeremove', this.onBeforeRemove, this);
        this.app.on('prerender', this.onAppPrerender, this);

        this.app.systems.on('update', this.onUpdate, this);
    }