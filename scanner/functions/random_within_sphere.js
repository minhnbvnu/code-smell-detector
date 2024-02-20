function random_within_sphere(rng) {
    rng = rng || random;
    const P = {x:0, y:0, z:0}
    let m = 0;
    do {
        P.x = rng(-1, 1);
        P.y = rng(-1, 1);
        P.z = rng(-1, 1);
        m = P.x * P.x + P.y * P.y + P.z * P.z;
    } while (m > 1);
    return P;
}