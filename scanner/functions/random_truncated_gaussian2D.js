function random_truncated_gaussian2D(mean, std, radius, rng) {
    rng = rng || random;
    if (radius === undefined) {
        throw Error("random_truncated_gaussian2D(mean, stddev, radius, random) requires 3 or 4 arguments.");
    }

    if (is_number(std)) { std = {x: std, y: std}; }
    if (is_number(mean)) { mean = {x: mean, y: mean}; }
    if (is_number(radius)) { radius = {x: radius, y: radius}; }

    var X = std.x / radius.x;
    var Y = std.y / radius.y;
    var r;
    do {
        r = rng();
        if (r > 0) {
            r = $Math.sqrt(-2 * $Math.log(r));
        }
    } while (square(r * X) + square(r * Y) > 1);
    var q = rng(0, 2 * $Math.PI);
    var g1 = r * $Math.cos(q);
    var g2 = r * $Math.sin(q);
    return {x: g1 * std.x + mean.x, y: g2 * std.y + mean.y};
}