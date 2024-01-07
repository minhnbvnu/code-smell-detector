constructor(options) {

        if (arguments.length === 2) {
            Debug.deprecated('Passing graphicsDevice to MorphTarget is deprecated, please remove the parameter.');
            options = arguments[1];
        }

        this.options = options;
        this._name = options.name;
        this._defaultWeight = options.defaultWeight || 0;

        // bounds
        this._aabb = options.aabb;

        // store delta positions, used by aabb evaluation
        this.deltaPositions = options.deltaPositions;
    }