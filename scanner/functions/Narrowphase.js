function Narrowphase(){

    /**
     * @property contactEquations
     * @type {Array}
     */
    this.contactEquations = [];

    /**
     * @property frictionEquations
     * @type {Array}
     */
    this.frictionEquations = [];

    /**
     * Whether to make friction equations in the upcoming contacts.
     * @property enableFriction
     * @type {Boolean}
     */
    this.enableFriction = true;

    /**
     * Whether to make equations enabled in upcoming contacts.
     * @property enabledEquations
     * @type {Boolean}
     */
    this.enabledEquations = true;

    /**
     * The friction slip force to use when creating friction equations.
     * @property slipForce
     * @type {Number}
     */
    this.slipForce = 10.0;

    /**
     * The friction value to use in the upcoming friction equations.
     * @property frictionCoefficient
     * @type {Number}
     */
    this.frictionCoefficient = 0.3;

    /**
     * Will be the .relativeVelocity in each produced FrictionEquation.
     * @property {Number} surfaceVelocity
     */
    this.surfaceVelocity = 0;

    /**
     * Keeps track of the allocated ContactEquations.
     * @property {ContactEquationPool} contactEquationPool
     *
     * @example
     *
     *     // Allocate a few equations before starting the simulation.
     *     // This way, no contact objects need to be created on the fly in the game loop.
     *     world.narrowphase.contactEquationPool.resize(1024);
     *     world.narrowphase.frictionEquationPool.resize(1024);
     */
    this.contactEquationPool = new ContactEquationPool({ size: 32 });

    /**
     * Keeps track of the allocated ContactEquations.
     * @property {FrictionEquationPool} frictionEquationPool
     */
    this.frictionEquationPool = new FrictionEquationPool({ size: 64 });

    /**
     * The restitution value to use in the next contact equations.
     * @property restitution
     * @type {Number}
     */
    this.restitution = 0;

    /**
     * The stiffness value to use in the next contact equations.
     * @property {Number} stiffness
     */
    this.stiffness = Equation.DEFAULT_STIFFNESS;

    /**
     * The stiffness value to use in the next contact equations.
     * @property {Number} stiffness
     */
    this.relaxation = Equation.DEFAULT_RELAXATION;

    /**
     * The stiffness value to use in the next friction equations.
     * @property frictionStiffness
     * @type {Number}
     */
    this.frictionStiffness = Equation.DEFAULT_STIFFNESS;

    /**
     * The relaxation value to use in the next friction equations.
     * @property frictionRelaxation
     * @type {Number}
     */
    this.frictionRelaxation = Equation.DEFAULT_RELAXATION;

    /**
     * Enable reduction of friction equations. If disabled, a box on a plane will generate 2 contact equations and 2 friction equations. If enabled, there will be only one friction equation. Same kind of simplifications are made  for all collision types.
     * @property enableFrictionReduction
     * @type {Boolean}
     * @deprecated This flag will be removed when the feature is stable enough.
     * @default true
     */
    this.enableFrictionReduction = true;

    /**
     * Keeps track of the colliding bodies last step.
     * @private
     * @property collidingBodiesLastStep
     * @type {TupleDictionary}
     */
    this.collidingBodiesLastStep = new TupleDictionary();

    /**
     * Contact skin size value to use in the next contact equations.
     * @property {Number} contactSkinSize
     * @default 0.01
     */
    this.contactSkinSize = 0.01;
}