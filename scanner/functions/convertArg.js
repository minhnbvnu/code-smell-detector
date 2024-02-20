function convertArg(arg) {
    if (Array.isArray(arg)) {
        return pointFromArray(arg);
    } else if (typeof arg === 'number') {
        return pointFromNumber(arg);
    } else if (isPoint(arg)) {
        return arg;
    }
}