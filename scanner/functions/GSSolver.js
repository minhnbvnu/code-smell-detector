function GSSolver(options){
    Solver.call(this,options,Solver.GS);
    options = options || {};

    /**
     * The max number of iterations to do when solving. More gives better results, but is more expensive.
     * @property iterations
     * @type {Number}
     */
    this.iterations = options.iterations || 10;

    /**
     * The error tolerance, per constraint. If the total error is below this limit, the solver will stop iterating. Set to zero for as good solution as possible, but to something larger than zero to make computations faster.
     * @property tolerance
     * @type {Number}
     * @default 1e-7
     */
    this.tolerance = options.tolerance || 1e-7;

    this.arrayStep = 30;
    this.lambda = new Utils.ARRAY_TYPE(this.arrayStep);
    this.Bs =     new Utils.ARRAY_TYPE(this.arrayStep);
    this.invCs =  new Utils.ARRAY_TYPE(this.arrayStep);

    /**
     * Set to true to set all right hand side terms to zero when solving. Can be handy for a few applications.
     * @property useZeroRHS
     * @type {Boolean}
     */
    this.useZeroRHS = false;

    /**
     * Number of solver iterations that are done to approximate normal forces. When these iterations are done, friction force will be computed from the contact normal forces. These friction forces will override any other friction forces set from the World for example.
     * The solver will use less iterations if the solution is below the .tolerance.
     * @property frictionIterations
     * @type {Number}
     */
    this.frictionIterations = 0;

    /**
     * The number of iterations that were made during the last solve. If .tolerance is zero, this value will always be equal to .iterations, but if .tolerance is larger than zero, and the solver can quit early, then this number will be somewhere between 1 and .iterations.
     * @property {Number} usedIterations
     */
    this.usedIterations = 0;
}