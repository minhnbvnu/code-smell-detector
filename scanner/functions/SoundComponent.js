constructor(system, entity) {
        super(system, entity);

        /** @private */
        this._volume = 1;
        /** @private */
        this._pitch = 1;
        /** @private */
        this._positional = true;
        /** @private */
        this._refDistance = 1;
        /** @private */
        this._maxDistance = 10000;
        /** @private */
        this._rollOffFactor = 1;
        /** @private */
        this._distanceModel = DISTANCE_LINEAR;

        /**
         * @type {Object<string, SoundSlot>}
         * @private
         */
        this._slots = {};

        /** @private */
        this._playingBeforeDisable = {};
    }