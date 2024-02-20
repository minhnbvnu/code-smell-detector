function random_within_square(rng) {
    rng = rng || random;
    return {x: rng(-1, 1), y: rng(-1, 1)};
}