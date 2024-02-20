function isInvalidPosition(pos) {
    return (
        !pos ||
        typeof pos.line !== 'number' ||
        typeof pos.column !== 'number' ||
        pos.line < 0 ||
        pos.column < 0
    );
}