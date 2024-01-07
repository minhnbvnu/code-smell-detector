constructor(system, entity) {
        super(system, entity);

        Debug.assert(typeof Ammo !== 'undefined', 'ERROR: Attempting to create a pc.JointComponent but Ammo.js is not loaded');

        this._constraint = null;

        this._entityA = null;
        this._entityB = null;
        this._breakForce = 3.4e+38;
        this._enableCollision = true;

        // Linear X degree of freedom
        this._linearMotionX = MOTION_LOCKED;
        this._linearLimitsX = new Vec2(0, 0);
        this._linearSpringX = false;
        this._linearStiffnessX = 0;
        this._linearDampingX = 1;
        this._linearEquilibriumX = 0;

        // Linear Y degree of freedom
        this._linearMotionY = MOTION_LOCKED;
        this._linearLimitsY = new Vec2(0, 0);
        this._linearSpringY = false;
        this._linearStiffnessY = 0;
        this._linearDampingY = 1;
        this._linearEquilibriumY = 0;

        // Linear Z degree of freedom
        this._linearMotionZ = MOTION_LOCKED;
        this._linearLimitsZ = new Vec2(0, 0);
        this._linearSpringZ = false;
        this._linearStiffnessZ = 0;
        this._linearDampingZ = 1;
        this._linearEquilibriumZ = 0;

        // Angular X degree of freedom
        this._angularMotionX = MOTION_LOCKED;
        this._angularLimitsX = new Vec2(0, 0);
        this._angularSpringX = false;
        this._angularStiffnessX = 0;
        this._angularDampingX = 1;
        this._angularEquilibriumX = 0;

        // Angular Y degree of freedom
        this._angularMotionY = MOTION_LOCKED;
        this._angularLimitsY = new Vec2(0, 0);
        this._angularSpringY = false;
        this._angularStiffnessY = 0;
        this._angularDampingY = 1;
        this._angularEquilibriumY = 0;

        // Angular Z degree of freedom
        this._angularMotionZ = MOTION_LOCKED;
        this._angularLimitsZ = new Vec2(0, 0);
        this._angularSpringZ = false;
        this._angularEquilibriumZ = 0;
        this._angularDampingZ = 1;
        this._angularStiffnessZ = 0;

        this.on('set_enabled', this._onSetEnabled, this);
    }