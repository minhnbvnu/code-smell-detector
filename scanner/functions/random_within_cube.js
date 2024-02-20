function random_within_cube(rng) {
    rng = rng || random;
    return {x: rng(-1, 1), y: rng(-1, 1), z: rng(-1, 1)};
}