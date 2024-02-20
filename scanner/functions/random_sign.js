function random_sign(rng) {
    rng = rng || random;
    return (rng() < 0.5) ? -1 : +1;
}