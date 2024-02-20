function isDaySegCollision(seg, otherSegs) {
    var i;
    var otherSeg;
    for (i = 0; i < otherSegs.length; i++) {
        otherSeg = otherSegs[i];
        if (otherSeg.leftCol <= seg.rightCol &&
            otherSeg.rightCol >= seg.leftCol) {
            return true;
        }
    }
    return false;
}