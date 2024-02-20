function random_gaussian3D(mean, std, rng) {
    rng = rng || random;
    if (std === undefined) {
        if (mean !== undefined) {
            throw Error("random_gaussian3D(mean, stddev, random) requires 0, 2, or 3 arguments.");
        }
        std = {x: 1, y: 1, z: 1};
        mean = {x: 0, y: 0, z: 0};
    }
    if (is_number(std)) { std = {x: std, y: std, z: std}; }
    if (is_number(mean)) { mean = {x: mean, y: mean, z: mean}; }
    var g = random_gaussian2D(mean, std, rng);
    g.z = random_gaussian(mean.z, std.z, rng);
    return g;
}