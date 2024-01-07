constructor(app) {
        super(app);

        this.id = 'audiosource';

        this.ComponentType = AudioSourceComponent;
        this.DataType = AudioSourceComponentData;

        this.schema = _schema;

        this.manager = app.soundManager;
        Debug.assert(this.manager, "AudioSourceComponentSystem cannot be created witout sound manager");

        this.initialized = false;

        this.app.systems.on('initialize', this.onInitialize, this);
        this.app.systems.on('update', this.onUpdate, this);

        this.on('remove', this.onRemove, this);
    }