constructor(app) {
        super(app);

        this.id = 'collision';

        this.ComponentType = CollisionComponent;
        this.DataType = CollisionComponentData;

        this.schema = _schema;

        this.implementations = { };

        this._triMeshCache = { };

        this.on('beforeremove', this.onBeforeRemove, this);
        this.on('remove', this.onRemove, this);
    }