function random_gaussian2D(mean, std, rng) {
    rng = rng || random;
    if (std === undefined) {
        if (mean !== undefined) {
            throw Error("random_gaussian2D(mean, stddev, random) requires 0, 2, or 3 arguments.");
        }
        std = {x: 1, y: 1};
        mean = {x: 0, y: 0};
    }

    if (is_number(std)) { std = {x: std, y: std}; }
    if (is_number(mean)) { mean = {x: mean, y: mean}; }
    
    var r = rng();
    if (r > 0) {
        r = $Math.sqrt(-2 * $Math.log(r));
    }
    var q = rng(0, 2 * $Math.PI);
    var g1 = r * $Math.cos(q);
    var g2 = r * $Math.sin(q);
    return {x: g1 * std.x + mean.x, y: g2 * std.y + mean.y};
}