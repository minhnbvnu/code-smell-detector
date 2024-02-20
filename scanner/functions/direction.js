function direction(a) {
    const m = magnitude(a);
    return (m > 1e-10) ? $mul(a, 1.0 / m) : clone(a);
}