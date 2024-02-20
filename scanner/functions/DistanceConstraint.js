function DistanceConstraint(bodyA,bodyB,options){
    options = Utils.defaults(options,{
        localAnchorA:[0,0],
        localAnchorB:[0,0]
    });

    Constraint.call(this,bodyA,bodyB,Constraint.DISTANCE,options);

    /**
     * Local anchor in body A.
     * @property localAnchorA
     * @type {Array}
     */
    this.localAnchorA = vec2.fromValues(options.localAnchorA[0], options.localAnchorA[1]);

    /**
     * Local anchor in body B.
     * @property localAnchorB
     * @type {Array}
     */
    this.localAnchorB = vec2.fromValues(options.localAnchorB[0], options.localAnchorB[1]);

    var localAnchorA = this.localAnchorA;
    var localAnchorB = this.localAnchorB;

    /**
     * The distance to keep.
     * @property distance
     * @type {Number}
     */
    this.distance = 0;

    if(typeof(options.distance) === 'number'){
        this.distance = options.distance;
    } else {
        // Use the current world distance between the world anchor points.
        var worldAnchorA = vec2.create(),
            worldAnchorB = vec2.create(),
            r = vec2.create();

        // Transform local anchors to world
        vec2.rotate(worldAnchorA, localAnchorA, bodyA.angle);
        vec2.rotate(worldAnchorB, localAnchorB, bodyB.angle);

        vec2.add(r, bodyB.position, worldAnchorB);
        vec2.sub(r, r, worldAnchorA);
        vec2.sub(r, r, bodyA.position);

        this.distance = vec2.length(r);
    }

    var maxForce;
    if(typeof(options.maxForce)==="undefined" ){
        maxForce = Number.MAX_VALUE;
    } else {
        maxForce = options.maxForce;
    }

    var normal = new Equation(bodyA,bodyB,-maxForce,maxForce); // Just in the normal direction
    this.equations = [ normal ];

    /**
     * Max force to apply.
     * @property {number} maxForce
     */
    this.maxForce = maxForce;

    // g = (xi - xj).dot(n)
    // dg/dt = (vi - vj).dot(n) = G*W = [n 0 -n 0] * [vi wi vj wj]'

    // ...and if we were to include offset points:
    // g =
    //      (xj + rj - xi - ri).dot(n) - distance
    //
    // dg/dt =
    //      (vj + wj x rj - vi - wi x ri).dot(n) =
    //      { term 2 is near zero } =
    //      [-n   -ri x n   n   rj x n] * [vi wi vj wj]' =
    //      G * W
    //
    // => G = [-n -rixn n rjxn]

    var r = vec2.create();
    var ri = vec2.create(); // worldAnchorA
    var rj = vec2.create(); // worldAnchorB
    var that = this;
    normal.computeGq = function(){
        var bodyA = this.bodyA,
            bodyB = this.bodyB,
            xi = bodyA.position,
            xj = bodyB.position;

        // Transform local anchors to world
        vec2.rotate(ri, localAnchorA, bodyA.angle);
        vec2.rotate(rj, localAnchorB, bodyB.angle);

        vec2.add(r, xj, rj);
        vec2.sub(r, r, ri);
        vec2.sub(r, r, xi);

        //vec2.sub(r, bodyB.position, bodyA.position);
        return vec2.length(r) - that.distance;
    };

    // Make the contact constraint bilateral
    this.setMaxForce(maxForce);

    /**
     * If the upper limit is enabled or not.
     * @property {Boolean} upperLimitEnabled
     */
    this.upperLimitEnabled = false;

    /**
     * The upper constraint limit.
     * @property {number} upperLimit
     */
    this.upperLimit = 1;

    /**
     * If the lower limit is enabled or not.
     * @property {Boolean} lowerLimitEnabled
     */
    this.lowerLimitEnabled = false;

    /**
     * The lower constraint limit.
     * @property {number} lowerLimit
     */
    this.lowerLimit = 0;

    /**
     * Current constraint position. This is equal to the current distance between the world anchor points.
     * @property {number} position
     */
    this.position = 0;
}