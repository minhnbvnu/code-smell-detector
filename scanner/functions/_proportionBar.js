function _proportionBar(proportion, length=20) {
    if (proportion > 1) {
        return '!'.repeat(length);
    }
    let n = Math.round(proportion * length);
    return '#'.repeat(n) + ' '.repeat(length - n);
}