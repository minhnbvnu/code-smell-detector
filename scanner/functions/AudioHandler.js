constructor(app) {
        this.manager = app.soundManager;
        Debug.assert(this.manager, "AudioSourceComponentSystem cannot be created without sound manager");

        this.maxRetries = 0;
    }