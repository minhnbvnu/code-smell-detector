constructor(app) {
        super(app);

        this.id = 'script';

        this.ComponentType = ScriptLegacyComponent;
        this.DataType = ScriptLegacyComponentData;
        this.schema = _schema;

        // used by application during preloading phase to ensure scripts aren't
        // initialized until everything is loaded
        this.preloading = false;

        // arrays to cache script instances for fast iteration
        this.instancesWithUpdate = [];
        this.instancesWithFixedUpdate = [];
        this.instancesWithPostUpdate = [];
        this.instancesWithToolsUpdate = [];

        this.on('beforeremove', this.onBeforeRemove, this);
        this.app.systems.on(INITIALIZE, this.onInitialize, this);
        this.app.systems.on(POST_INITIALIZE, this.onPostInitialize, this);
        this.app.systems.on(UPDATE, this.onUpdate, this);
        this.app.systems.on(FIXED_UPDATE, this.onFixedUpdate, this);
        this.app.systems.on(POST_UPDATE, this.onPostUpdate, this);
        this.app.systems.on(TOOLS_UPDATE, this.onToolsUpdate, this);
    }