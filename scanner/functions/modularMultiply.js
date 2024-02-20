function modularMultiply(val, factor, modulus) {
    if (val >= modulus) {
        return val;
    }
    factor = Util.properMod(factor, modulus);
    if (factor === 0 || Util.extended_gcd(factor, modulus).gcd !== 1) {
        return val;
    }
    return (val * factor) % modulus;
}