constructor(entity, mesh, material) {
        this._entity = entity;
        this._element = entity.element;

        this.model = new Model();
        this.node = new GraphNode();
        this.model.graph = this.node;

        this.mesh = mesh;
        this.meshInstance = new MeshInstance(this.mesh, material, this.node);
        this.meshInstance.name = 'ImageElement: ' + entity.name;
        this.meshInstance.castShadow = false;
        this.meshInstance.receiveShadow = false;

        this._meshDirty = false;

        this.model.meshInstances.push(this.meshInstance);

        this._entity.addChild(this.model.graph);
        this.model._entity = this._entity;

        this.unmaskMeshInstance = null;
    }