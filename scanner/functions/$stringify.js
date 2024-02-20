function $stringify(b) {
    if (b === undefined) {
        return '∅';
    } else if (b === Infinity) {
        return '∞';
    } else if (b === -Infinity) {
        return '-∞';
    } else {
        return b;
    }

    return b;
}