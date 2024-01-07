constructor(state, parent, name, point, speed = 1) {
        this._state = state;
        this._parent = parent;
        this._name = name;
        if (Array.isArray(point)) {
            this._point = new Vec2(point[0], point[1]);
            this._pointLength = this._point.length();
        } else {
            this._point = point;
            this._pointLength = point;
        }

        this._speed = speed;
        this._weightedSpeed = 1.0;
        this._weight = 1.0;
        this._animTrack = null;
    }