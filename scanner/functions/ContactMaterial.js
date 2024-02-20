function ContactMaterial(materialA, materialB, options){
    options = options || {};

    if(!(materialA instanceof Material) || !(materialB instanceof Material)){
        throw new Error("First two arguments must be Material instances.");
    }

    /**
     * The contact material identifier
     * @property id
     * @type {Number}
     */
    this.id = ContactMaterial.idCounter++;

    /**
     * First material participating in the contact material
     * @property materialA
     * @type {Material}
     */
    this.materialA = materialA;

    /**
     * Second material participating in the contact material
     * @property materialB
     * @type {Material}
     */
    this.materialB = materialB;

    /**
     * Friction to use in the contact of these two materials
     * @property friction
     * @type {Number}
     */
    this.friction    =  typeof(options.friction)    !== "undefined" ?   Number(options.friction)    : 0.3;

    /**
     * Restitution to use in the contact of these two materials
     * @property restitution
     * @type {Number}
     */
    this.restitution =  typeof(options.restitution) !== "undefined" ?   Number(options.restitution) : 0.0;

    /**
     * Stiffness of the resulting ContactEquation that this ContactMaterial generate
     * @property stiffness
     * @type {Number}
     */
    this.stiffness =            typeof(options.stiffness)           !== "undefined" ?   Number(options.stiffness)   : Equation.DEFAULT_STIFFNESS;

    /**
     * Relaxation of the resulting ContactEquation that this ContactMaterial generate
     * @property relaxation
     * @type {Number}
     */
    this.relaxation =           typeof(options.relaxation)          !== "undefined" ?   Number(options.relaxation)  : Equation.DEFAULT_RELAXATION;

    /**
     * Stiffness of the resulting FrictionEquation that this ContactMaterial generate
     * @property frictionStiffness
     * @type {Number}
     */
    this.frictionStiffness =    typeof(options.frictionStiffness)   !== "undefined" ?   Number(options.frictionStiffness)   : Equation.DEFAULT_STIFFNESS;

    /**
     * Relaxation of the resulting FrictionEquation that this ContactMaterial generate
     * @property frictionRelaxation
     * @type {Number}
     */
    this.frictionRelaxation =   typeof(options.frictionRelaxation)  !== "undefined" ?   Number(options.frictionRelaxation)  : Equation.DEFAULT_RELAXATION;

    /**
     * Will add surface velocity to this material. If bodyA rests on top if bodyB, and the surface velocity is positive, bodyA will slide to the right.
     * @property {Number} surfaceVelocity
     */
    this.surfaceVelocity = typeof(options.surfaceVelocity)    !== "undefined" ?   Number(options.surfaceVelocity)    : 0;

    /**
     * Offset to be set on ContactEquations. A positive value will make the bodies penetrate more into each other. Can be useful in scenes where contacts need to be more persistent, for example when stacking. Aka "cure for nervous contacts".
     * @property contactSkinSize
     * @type {Number}
     */
    this.contactSkinSize = 0.005;
}