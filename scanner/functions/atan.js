function atan(y, x) {
    if (typeof y === 'number') { return $Math.atan2(y, x); }
    return $Math.atan2(y.y, y.x);
}