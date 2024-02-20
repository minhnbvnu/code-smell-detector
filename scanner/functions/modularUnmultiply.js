function modularUnmultiply(val, factor, modulus) {
    if (val >= modulus) {
        return val;
    }
    factor = Util.properMod(factor, modulus);
    if (factor === 0) {
        return val;
    }

    let inverse_factor = Util.modular_multiplicative_inverse(factor, modulus);
    if (inverse_factor === undefined) {
        return val;
    }
    return (val * inverse_factor) % modulus;
}