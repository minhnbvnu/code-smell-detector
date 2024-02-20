function vec(x, y, z, w) {
    if (w !== undefined) {
        return {x:x, y:y, z:z, w:w}
    } else if (z !== undefined) {
        return {x:x, y:y, z:z}
    } else {
        return {x:x, y:y}
    }
}