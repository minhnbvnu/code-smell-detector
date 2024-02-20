function random_gaussian(mean, std, rng) {
    rng = rng || random;
    if (std === undefined) {
        if (mean !== undefined) {
            throw Error("random_gaussian(mean, stddev, random) requires 0, 2, or 3 arguments.");
        }
        std = 1;
        mean = 0;
    }
    var r = rng();
    if (r > 0) {
        r = $Math.sqrt(-2 * $Math.log(r));
    }
    var q = rng(0, 2 * $Math.PI);
    var g1 = r * $Math.cos(q);
    return g1 * std + mean;    
}