function LinearSpring(bodyA,bodyB,options){
    options = options || {};

    Spring.call(this, bodyA, bodyB, options);

    /**
     * Anchor for bodyA in local bodyA coordinates.
     * @property localAnchorA
     * @type {Array}
     */
    this.localAnchorA = vec2.fromValues(0,0);

    /**
     * Anchor for bodyB in local bodyB coordinates.
     * @property localAnchorB
     * @type {Array}
     */
    this.localAnchorB = vec2.fromValues(0,0);

    if(options.localAnchorA){ vec2.copy(this.localAnchorA, options.localAnchorA); }
    if(options.localAnchorB){ vec2.copy(this.localAnchorB, options.localAnchorB); }
    if(options.worldAnchorA){ this.setWorldAnchorA(options.worldAnchorA); }
    if(options.worldAnchorB){ this.setWorldAnchorB(options.worldAnchorB); }

    var worldAnchorA = vec2.create();
    var worldAnchorB = vec2.create();
    this.getWorldAnchorA(worldAnchorA);
    this.getWorldAnchorB(worldAnchorB);
    var worldDistance = vec2.distance(worldAnchorA, worldAnchorB);

    /**
     * Rest length of the spring.
     * @property restLength
     * @type {number}
     */
    this.restLength = typeof(options.restLength) === "number" ? options.restLength : worldDistance;
}