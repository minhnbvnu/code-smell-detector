function parseTimeFormula(formula, time, warn) {
    let tokenMap = new Map([...PARSE_COMPLEX_TOKEN_MAP_RAD.entries()]);
    if (time !== undefined) {
        tokenMap.set('t', time);
    }
    try {
        let angle = Complex.from(parseFormula(formula, tokenMap));
        if (Math.abs(angle.imag) > 0.0001) {
            throw new Error(`Non-real angle: ${formula} = ${angle}`);
        }
        return angle.real;
    } catch (ex) {
        if (warn) {
            console.warn(ex);
        }
        return undefined;
    }
}