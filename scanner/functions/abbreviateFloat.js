function abbreviateFloat(value, epsilon=0, digits=undefined) {
    if (Math.abs(value) < epsilon) {
        return "0";
    }
    if (value < 0) {
        return "-" + abbreviateFloat(-value, epsilon, digits);
    }

    let fraction = match(UNICODE_FRACTIONS, e => Math.abs(e.value - value) <= epsilon);
    if (fraction !== undefined) {
        return fraction.character;
    }

    let rootFraction = match(UNICODE_FRACTIONS, e => Math.abs(Math.sqrt(e.value) - value) <= epsilon);
    if (rootFraction !== undefined) {
        return "\u221A" + rootFraction.character;
    }

    if (value % 1 !== 0 && digits !== undefined) {
        return value.toFixed(digits);
    }

    return value.toString();
}