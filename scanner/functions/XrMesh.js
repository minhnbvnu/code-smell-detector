constructor(meshDetection, xrMesh) {
        super();

        this._meshDetection = meshDetection;
        this._xrMesh = xrMesh;
        this._lastChanged = this._xrMesh.lastChangedTime;
    }