function normalizeRect(rect) {
    var o = rect.origin,
        c = rect.corner,

        ox = Math.min(o.x, c.x),
        oy = Math.min(o.y, c.y),

        cx = Math.max(o.x, c.x),
        cy = Math.max(o.y, c.y);

    return new SelectionRectangle(ox, oy, cx - ox, cy - oy);
}