function normalVector(vx, vy, intensity) {
    var n = hypo(vx, vy);
    if (n === 0) {
        return {x: vx, y: vy};
    }
    if (intensity) {
        return {x: ((vx / n) * intensity), y: ((vy / n) * intensity)};
    }
    return {x: vx / n, y: vy / n};
}