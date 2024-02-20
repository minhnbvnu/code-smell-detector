function OverlapKeeperRecord(bodyA, shapeA, bodyB, shapeB){
    /**
     * @property {Shape} shapeA
     */
    this.shapeA = shapeA;
    /**
     * @property {Shape} shapeB
     */
    this.shapeB = shapeB;
    /**
     * @property {Body} bodyA
     */
    this.bodyA = bodyA;
    /**
     * @property {Body} bodyB
     */
    this.bodyB = bodyB;
}