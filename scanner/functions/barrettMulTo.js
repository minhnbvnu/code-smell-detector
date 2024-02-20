function barrettMulTo(x, y, r) {
    x.multiplyTo(y, r);
    this.reduce(r);
}