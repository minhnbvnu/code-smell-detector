constructor(manager, sound, options = {}) {
        super(manager, sound, options);

        if (options.position)
            this.position = options.position;

        this.maxDistance = options.maxDistance !== undefined ? Number(options.maxDistance) : MAX_DISTANCE;
        this.refDistance = options.refDistance !== undefined ? Number(options.refDistance) : 1;
        this.rollOffFactor = options.rollOffFactor !== undefined ? Number(options.rollOffFactor) : 1;
        this.distanceModel = options.distanceModel !== undefined ? options.distanceModel : DISTANCE_LINEAR;
    }