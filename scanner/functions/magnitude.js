function magnitude(a) {
    if (typeof a === 'number') {
        return $Math.hypot.apply(null, arguments);
    } else {
        return $Math.sqrt(dot(a, a));
    }
}