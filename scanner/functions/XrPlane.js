constructor(planeDetection, xrPlane) {
        super();

        this._id = ++ids;
        this._planeDetection = planeDetection;
        this._xrPlane = xrPlane;
        this._lastChangedTime = xrPlane.lastChangedTime;
        this._orientation = xrPlane.orientation;
    }