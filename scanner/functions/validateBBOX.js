function validateBBOX(bbox) {
    return bbox && bbox[0] !== Infinity && bbox[0] !== undefined;
}