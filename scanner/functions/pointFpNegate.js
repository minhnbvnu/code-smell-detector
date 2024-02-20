function pointFpNegate() {
    return new ECPointFp(this.curve, this.x, this.y.negate(), this.z);
}