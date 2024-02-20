function isSlotSegCollision(seg1, seg2) {
    return seg1.bottom > seg2.top && seg1.top < seg2.bottom;
}