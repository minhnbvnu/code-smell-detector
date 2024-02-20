function Zone_GetWebPartIndex(location) {
    var x = location.x;
    var y = location.y;
    if ((x < this.webPartTableLeft) || (x > this.webPartTableRight) ||
        (y < this.webPartTableTop) || (y > this.webPartTableBottom)) {
        return -1;
    }
    var vertical = this.isVertical;
    var webParts = this.webParts;
    var webPartsCount = webParts.length;
    for (var i = 0; i < webPartsCount; i++) {
        var webPart = webParts[i];
        if (vertical) {
            if (y < webPart.middleY) {
                return i;
            }
        }
        else {
            if (x < webPart.middleX) {
                return i;
            }
        }
    }
    return webPartsCount;
}