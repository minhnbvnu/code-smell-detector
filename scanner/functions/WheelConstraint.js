function WheelConstraint(vehicle, options){
    options = options || {};

    this.vehicle = vehicle;

    this.forwardEquation = new FrictionEquation(vehicle.chassisBody, vehicle.groundBody);

    this.sideEquation = new FrictionEquation(vehicle.chassisBody, vehicle.groundBody);

    /**
     * @property {number} steerValue
     */
    this.steerValue = 0;

    /**
     * @property {number} engineForce
     */
    this.engineForce = 0;

    this.setSideFriction(options.sideFriction !== undefined ? options.sideFriction : 5);

    /**
     * @property {Array} localForwardVector
     */
    this.localForwardVector = vec2.fromValues(0, 1);
    if(options.localForwardVector){
        vec2.copy(this.localForwardVector, options.localForwardVector);
    }

    /**
     * @property {Array} localPosition
     */
    this.localPosition = vec2.fromValues(0, 0);
    if(options.localPosition){
        vec2.copy(this.localPosition, options.localPosition);
    }

    Constraint.apply(this, vehicle.chassisBody, vehicle.groundBody);

    this.equations.push(
        this.forwardEquation,
        this.sideEquation
    );

    this.setBrakeForce(0);
}