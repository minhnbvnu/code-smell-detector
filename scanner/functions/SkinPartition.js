constructor() {
        this.partition = 0;
        this.vertexStart = 0;
        this.vertexCount = 0;
        this.indexStart = 0;
        this.indexCount = 0;

        // Indices of bones in this partition. skin matrices will be uploaded to the vertex shader in this order.
        this.boneIndices = [];

        // Partitioned vertex attributes
        this.vertices = [];
        // Partitioned vertex indices
        this.indices = [];
        // Maps the index of an un-partitioned vertex to that same vertex if it has been added
        // to this particular partition. speeds up checking for duplicate vertices so we don't
        // add the same vertex more than once.
        this.indexMap = {};

        this.originalMesh = null;
    }