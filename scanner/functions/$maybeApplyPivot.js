function $maybeApplyPivot(pos, pivot, angle, scale) {
    if (! pivot || (pivot.x === 0 && pivot.y === 0)) {
        return pos;
    }

    let scaleX = 1, scaleY = 1;
    if (scale) {
        if (is_number(scale)) {
            scaleX = scaleY = scale;
        } else {
            scaleX = scale.x;
            scaleY = scale.y;
        }
    }

    if (angle === undefined) { angle = 0; }
    
    // Raw sprite offset
    // Scale into sprite space
    let deltaX = pivot.x * $Math.sign($scaleX) * scaleX;
    let deltaY = pivot.y * $Math.sign($scaleY) * scaleY;
    
    // Rotate into sprite space
    const C = $Math.cos(angle);
    const S = $Math.sin(angle) * -rotation_sign();
    return {x: pos.x - (deltaX * C + S * deltaY),
            y: pos.y - (deltaY * C - S * deltaX),
            z: pos.z};
}