constructor(device) {
        this.device = device;
        this.name = 'Untitled';

        // number of times a warning was reported
        this.reportCount = 0;

        // bounds of all light volumes (volume covered by the clusters)
        this.boundsMin = new Vec3();
        this.boundsMax = new Vec3();
        this.boundsDelta = new Vec3();

        // number of cells along 3 axes
        this._cells = new Vec3(1, 1, 1);       // number of cells
        this._cellsLimit = new Vec3();  // number of cells minus one
        this.cells = this._cells;

        // number of lights each cell can store
        this.maxCellLightCount = 4;

        // limits on some light properties, used for compression to 8bit texture
        this._maxAttenuation = 0;
        this._maxColorValue = 0;

        // internal list of lights (of type ClusterLight)
        this._usedLights = [];

        // light 0 is always reserved for 'no light' index
        this._usedLights.push(new ClusterLight());

        // allocate textures to store lights
        this.lightsBuffer = new LightsBuffer(device);

        // register shader uniforms
        this.registerUniforms(device);
    }