function random_on_cube(rng) {
    rng = rng || random;
    var r = rng() < 1/3;
    if (r < 1/3) {
        return {x: random_sign(), y: rng(-1, 1), z: rng(-1, 1)};
    } else if (r < 2/3) {
        return {x: rng(-1, 1), y: random_sign(), z: rng(-1, 1)};
    } else {
        return {x: rng(-1, 1), y: rng(-1, 1), z: random_sign()};
    }
}