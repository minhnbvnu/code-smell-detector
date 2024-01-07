function getAlignPoint(size, horizontalAlignment, verticalAlignment) {
    const width = size['width'],
        height = size['height'];
    let alignW, alignH;
    if (horizontalAlignment === 'left') {
        alignW = -width;
    } else if (horizontalAlignment === 'right') {
        alignW = 0;
    } else {
        alignW = -width / 2;
    }
    if (verticalAlignment === 'top') {
        alignH = -height;
    } else if (verticalAlignment === 'bottom') {
        alignH = 0;
    } else {
        alignH = -height / 2;
    }
    return new Point(alignW, alignH);
}