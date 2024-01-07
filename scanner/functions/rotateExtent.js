function rotateExtent(fixedExtent, angle) {
    const { xmin, ymin, xmax, ymax } = fixedExtent;
    ROTATE_EXTENT.set(xmin, ymin, xmax, ymax);
    return ROTATE_EXTENT.convertTo(p => p._rotate(angle), fixedExtent);
}