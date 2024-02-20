function random_truncated_gaussian(mean, std, radius, rng) {
    rng = rng || random;
    if (radius === undefined) { radius = 2.5 * std; }
    var g = 0;
    do {
        g = random_gaussian(mean, std, rng);
    } while (g < mean - radius || g > mean + radius);
    return g;
}