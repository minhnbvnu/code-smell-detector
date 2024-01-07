constructor(system, entity) {
        super(system, entity);

        this.on('set_colorMapAsset', this.onSetColorMapAsset, this);
        this.on('set_normalMapAsset', this.onSetNormalMapAsset, this);
        this.on('set_meshAsset', this.onSetMeshAsset, this);
        this.on('set_mesh', this.onSetMesh, this);
        this.on('set_renderAsset', this.onSetRenderAsset, this);
        this.on('set_loop', this.onSetLoop, this);
        this.on('set_blendType', this.onSetBlendType, this);
        this.on('set_depthSoftening', this.onSetDepthSoftening, this);
        this.on('set_layers', this.onSetLayers, this);

        SIMPLE_PROPERTIES.forEach((prop) => {
            this.on(`set_${prop}`, this.onSetSimpleProperty, this);
        });

        COMPLEX_PROPERTIES.forEach((prop) => {
            this.on(`set_${prop}`, this.onSetComplexProperty, this);
        });

        GRAPH_PROPERTIES.forEach((prop) => {
            this.on(`set_${prop}`, this.onSetGraphProperty, this);
        });
    }