constructor(app) {
        super(app);

        this.id = 'sound';

        this.ComponentType = SoundComponent;
        this.DataType = SoundComponentData;

        this.schema = _schema;

        /**
         * Gets / sets the sound manager.
         *
         * @type {import('../../../platform/sound/manager.js').SoundManager}
         */
        this.manager = app.soundManager;
        Debug.assert(this.manager, "AudioSourceComponentSystem cannot be created without sound manager");

        this.app.systems.on('update', this.onUpdate, this);

        this.on('beforeremove', this.onBeforeRemove, this);
    }