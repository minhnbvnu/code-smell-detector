function gauss(direction, taps = 5, samplerNum) {
    return new BlurExpr(direction, taps, samplerNum);
}