function realBlendMode(mode) {
    if (aliases[mode] !== undefined) { return aliases[mode]; }
    return mode;
}