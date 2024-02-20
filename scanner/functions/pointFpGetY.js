function pointFpGetY() {
    if(this.zinv == null) {
      this.zinv = this.z.modInverse(this.curve.q);
    }
    var r = this.y.toBigInteger().multiply(this.zinv);
    this.curve.reduce(r);
    return this.curve.fromBigInteger(r);
}