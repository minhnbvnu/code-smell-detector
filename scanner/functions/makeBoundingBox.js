function makeBoundingBox(a) {
    if(!a.shape) {
        return a;
    }
    return {
        x:a.x + a.shape.x,
        y:a.y + a.shape.y,
        type: a.shape.type || a.type,
        w:a.shape.w,
        h:a.shape.h,
        angle:a.angle
    };
}