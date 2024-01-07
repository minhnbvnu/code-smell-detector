constructor({ from, to, time = 0, priority = 0, conditions = [], exitTime = null, transitionOffset = null, interruptionSource = ANIM_INTERRUPTION_NONE }) {
        this._from = from;
        this._to = to;
        this._time = time;
        this._priority = priority;
        this._conditions = conditions;
        this._exitTime = exitTime;
        this._transitionOffset = transitionOffset;
        this._interruptionSource = interruptionSource;
    }