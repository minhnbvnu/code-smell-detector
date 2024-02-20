function pow32 (mantissa, exponent) {
    const exp = Number.parseInt(exponent, 32);
    if (exp < 0) {
        return roundToPrecision(
            Number.parseInt(mantissa, 32) * (32 ** (exp - 10))
        );
    }
    if (exp < 11) {
        const whole = mantissa.slice(0, exp);
        const wholeNum = Number.parseInt(whole, 32);
        const fraction = mantissa.slice(exp);
        const fractionNum = Number.parseInt(fraction, 32) * (32 ** (exp - 11));
        return roundToPrecision(wholeNum + fractionNum);
    }
    const expansion = mantissa + zeros(exp - 11);
    return Number.parseInt(expansion, 32);
}