function pointFpGetX() {
    if(this.zinv == null) {
      this.zinv = this.z.modInverse(this.curve.q);
    }
    var r = this.x.toBigInteger().multiply(this.zinv);
    this.curve.reduce(r);
    return this.curve.fromBigInteger(r);
}