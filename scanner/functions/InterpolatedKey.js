constructor() {
        this._written = false;
        this._name = '';
        this._keyFrames = [];

        // Result of interpolation
        this._quat = new Quat();
        this._pos = new Vec3();
        this._scale = new Vec3();

        // Optional destination for interpolated keyframe
        this._targetNode = null;
    }