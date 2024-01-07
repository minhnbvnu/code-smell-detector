constructor(system, entity) {
        super(system, entity);

        this._camera.node = entity;

        // postprocessing management
        this._postEffects = new PostEffectQueue(system.app, this);
    }