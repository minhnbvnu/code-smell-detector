function random_on_square(rng) {
    rng = rng || random;
    if (rng() < 0.5) {
        return {x: random_sign(), y: rng(-1, 1)};
    } else {
        return {x: rng(-1, 1), y: random_sign()};
    }
}