function PrismaticConstraint(bodyA, bodyB, options){
    options = options || {};
    Constraint.call(this,bodyA,bodyB,Constraint.PRISMATIC,options);

    // Get anchors
    var localAnchorA = vec2.fromValues(0,0),
        localAxisA = vec2.fromValues(1,0),
        localAnchorB = vec2.fromValues(0,0);
    if(options.localAnchorA){ vec2.copy(localAnchorA, options.localAnchorA); }
    if(options.localAxisA){ vec2.copy(localAxisA,   options.localAxisA); }
    if(options.localAnchorB){ vec2.copy(localAnchorB, options.localAnchorB); }

    /**
     * @property localAnchorA
     * @type {Array}
     */
    this.localAnchorA = localAnchorA;

    /**
     * @property localAnchorB
     * @type {Array}
     */
    this.localAnchorB = localAnchorB;

    /**
     * @property localAxisA
     * @type {Array}
     */
    this.localAxisA = localAxisA;

    /*

    The constraint violation for the common axis point is

        g = ( xj + rj - xi - ri ) * t   :=  gg*t

    where r are body-local anchor points, and t is a tangent to the constraint axis defined in body i frame.

        gdot =  ( vj + wj x rj - vi - wi x ri ) * t + ( xj + rj - xi - ri ) * ( wi x t )

    Note the use of the chain rule. Now we identify the jacobian

        G*W = [ -t      -ri x t + t x gg     t    rj x t ] * [vi wi vj wj]

    The rotational part is just a rotation lock.

     */

    var maxForce = this.maxForce = typeof(options.maxForce)!=="undefined" ? options.maxForce : Number.MAX_VALUE;

    // Translational part
    var trans = new Equation(bodyA,bodyB,-maxForce,maxForce);
    var ri = new vec2.create(),
        rj = new vec2.create(),
        gg = new vec2.create(),
        t =  new vec2.create();
    trans.computeGq = function(){
        // g = ( xj + rj - xi - ri ) * t
        return vec2.dot(gg,t);
    };
    trans.updateJacobian = function(){
        var G = this.G,
            xi = bodyA.position,
            xj = bodyB.position;
        vec2.rotate(ri,localAnchorA,bodyA.angle);
        vec2.rotate(rj,localAnchorB,bodyB.angle);
        vec2.add(gg,xj,rj);
        vec2.sub(gg,gg,xi);
        vec2.sub(gg,gg,ri);
        vec2.rotate(t,localAxisA,bodyA.angle+Math.PI/2);

        G[0] = -t[0];
        G[1] = -t[1];
        G[2] = -vec2.crossLength(ri,t) + vec2.crossLength(t,gg);
        G[3] = t[0];
        G[4] = t[1];
        G[5] = vec2.crossLength(rj,t);
    };
    this.equations.push(trans);

    // Rotational part
    if(!options.disableRotationalLock){
        var rot = new RotationalLockEquation(bodyA,bodyB,-maxForce,maxForce);
        this.equations.push(rot);
    }

    /**
     * The position of anchor A relative to anchor B, along the constraint axis.
     * @property position
     * @type {Number}
     */
    this.position = 0;

    // Is this one used at all?
    this.velocity = 0;

    /**
     * Set to true to enable lower limit.
     * @property lowerLimitEnabled
     * @type {Boolean}
     */
    this.lowerLimitEnabled = typeof(options.lowerLimit)!=="undefined" ? true : false;

    /**
     * Set to true to enable upper limit.
     * @property upperLimitEnabled
     * @type {Boolean}
     */
    this.upperLimitEnabled = typeof(options.upperLimit)!=="undefined" ? true : false;

    /**
     * Lower constraint limit. The constraint position is forced to be larger than this value.
     * @property lowerLimit
     * @type {Number}
     */
    this.lowerLimit = typeof(options.lowerLimit)!=="undefined" ? options.lowerLimit : 0;

    /**
     * Upper constraint limit. The constraint position is forced to be smaller than this value.
     * @property upperLimit
     * @type {Number}
     */
    this.upperLimit = typeof(options.upperLimit)!=="undefined" ? options.upperLimit : 1;

    // Equations used for limits
    this.upperLimitEquation = new ContactEquation(bodyA,bodyB);
    this.lowerLimitEquation = new ContactEquation(bodyA,bodyB);

    // Set max/min forces
    this.upperLimitEquation.minForce = this.lowerLimitEquation.minForce = 0;
    this.upperLimitEquation.maxForce = this.lowerLimitEquation.maxForce = maxForce;

    /**
     * Equation used for the motor.
     * @property motorEquation
     * @type {Equation}
     */
    this.motorEquation = new Equation(bodyA,bodyB);

    /**
     * The current motor state. Enable or disable the motor using .enableMotor
     * @property motorEnabled
     * @type {Boolean}
     */
    this.motorEnabled = false;

    /**
     * Set the target speed for the motor.
     * @property motorSpeed
     * @type {Number}
     */
    this.motorSpeed = 0;

    var that = this;
    var motorEquation = this.motorEquation;
    var old = motorEquation.computeGW;
    motorEquation.computeGq = function(){ return 0; };
    motorEquation.computeGW = function(){
        var G = this.G,
            bi = this.bodyA,
            bj = this.bodyB,
            vi = bi.velocity,
            vj = bj.velocity,
            wi = bi.angularVelocity,
            wj = bj.angularVelocity;
        return this.gmult(G,vi,wi,vj,wj) + that.motorSpeed;
    };
}