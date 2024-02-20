function modularPowerMultiply(val, base, exponent, modulus) {
    if (val >= modulus) {
        return val;
    }
    base = Util.properMod(base, modulus);
    let inverse = Util.modular_multiplicative_inverse(base, modulus);
    if (inverse === undefined) {
        return val;
    }

    if (exponent < 0) {
        exponent = -exponent;
        base = inverse;
    }

    while (exponent > 0) {
        if ((exponent & 1) !== 0) {
            val = (val * base) % modulus;
        }
        base = (base*base) % modulus;
        exponent >>= 1;
    }
    return val;
}