constructor(animComponent, graph, layerName, mask, layerIndex) {
        super(graph);
        this.animComponent = animComponent;
        this._mask = mask;
        this.layerName = layerName;
        this.layerIndex = layerIndex;
    }