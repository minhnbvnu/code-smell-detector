function RotationalLockEquation(bodyA, bodyB, options){
    options = options || {};
    Equation.call(this, bodyA, bodyB, -Number.MAX_VALUE, Number.MAX_VALUE);

    /**
     * @property {number} angle
     */
    this.angle = options.angle || 0;

    var G = this.G;
    G[2] =  1;
    G[5] = -1;
}