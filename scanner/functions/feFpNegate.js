function feFpNegate() {
    return new ECFieldElementFp(this.q, this.x.negate().mod(this.q));
}