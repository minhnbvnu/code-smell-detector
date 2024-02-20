function isPoint(arg) {
    if (!arg) { return false; }
    return arg.x !== undefined && arg.y !== undefined;
}