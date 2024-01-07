constructor(system, entity) {
        super(system, entity);

        this.on('set_assets', this.onSetAssets, this);
        this.on('set_loop', this.onSetLoop, this);
        this.on('set_volume', this.onSetVolume, this);
        this.on('set_pitch', this.onSetPitch, this);
        this.on('set_minDistance', this.onSetMinDistance, this);
        this.on('set_maxDistance', this.onSetMaxDistance, this);
        this.on('set_rollOffFactor', this.onSetRollOffFactor, this);
        this.on('set_distanceModel', this.onSetDistanceModel, this);
        this.on('set_3d', this.onSet3d, this);
    }