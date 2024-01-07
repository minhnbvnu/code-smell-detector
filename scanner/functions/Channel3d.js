constructor(manager, sound, options) {
        super(manager, sound, options);

        this.position = new Vec3();
        this.velocity = new Vec3();

        if (hasAudioContext()) {
            this.panner = manager.context.createPanner();
        } else {
            this.maxDistance = MAX_DISTANCE;
            this.minDistance = 1;
            this.rollOffFactor = 1;
            this.distanceModel = DISTANCE_INVERSE;
        }
    }