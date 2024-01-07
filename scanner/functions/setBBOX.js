function setBBOX(bbox, x1, y1, x2, y2) {
    if (x1 !== 0 && !x1) {
        return;
    }
    //x1 is bbox array
    if (Array.isArray(x1)) {
        y1 = x1[1];
        x2 = x1[2];
        y2 = x1[3];
        x1 = x1[0];
    }
    bbox[0] = Math.min(x1, bbox[0]);
    bbox[1] = Math.min(y1, bbox[1]);
    bbox[2] = Math.max(x2, bbox[2]);
    bbox[3] = Math.max(y2, bbox[3]);
}