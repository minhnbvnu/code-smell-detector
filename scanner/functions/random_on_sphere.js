function random_on_sphere(rng) {
    rng = rng || random;
    const a = $Math.acos(rng(-1, 1)) - $Math.PI / 2;
    const b = rng(0, $Math.PI * 2);
    const c = $Math.cos(a);
    return {x: c * $Math.cos(b), y: c * $Math.sin(b), z: $Math.sin(a)};
}