constructor(app) {
        super(app);

        this.id = 'audiolistener';

        this.ComponentType = AudioListenerComponent;
        this.DataType = AudioListenerComponentData;

        this.schema = _schema;

        this.manager = app.soundManager;
        Debug.assert(this.manager, "AudioSourceComponentSystem cannot be created witout sound manager");

        this.current = null;

        this.app.systems.on('update', this.onUpdate, this);
    }