function random_truncated_gaussian3D(mean, std, radius, rng) {
    rng = rng || random;
    if (radius === undefined) {
        throw Error("random_truncated_gaussian3D(mean, stddev, radius, random) requires 3 or 4 arguments.");
    }
    if (is_number(std)) { std = {x: std, y: std, z: std}; }
    if (is_number(mean)) { mean = {x: mean, y: mean, z: mean}; }
    if (is_number(radius)) { mean = {x: radius, y: radius, z: radius}; }

    var center = {x: 0, y: 0, z: 0};
    var g;

    do {
        g = {x: random_gaussian(0, std.x, rng),
             y: random_gaussian(0, std.y, rng),
             z: random_gaussian(0, std.z, rng)};
    } while (square(g.x / radius.x) + square(g.y / radius.y) + square(g.z / radius.z) > 1);
    
    return {x: g.x + mean.x, y: g.y + mean.y, z: g.z + mean.z};
}