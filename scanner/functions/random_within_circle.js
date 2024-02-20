function random_within_circle(rng) {
    rng = rng || random;
    const P = {x:0, y:0}
    let m = 0;
    do {
        P.x = rng(-1, 1);
        P.y = rng(-1, 1);
        m = P.x * P.x + P.y * P.y;
    } while (m > 1);
    return P;
}