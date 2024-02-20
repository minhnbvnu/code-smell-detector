function curveFpFromBigInteger(x) {
    return new ECFieldElementFp(this.q, x);
}