function feFpSquare() {
    return new ECFieldElementFp(this.q, this.x.square().mod(this.q));
}