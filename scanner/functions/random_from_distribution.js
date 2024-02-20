function random_from_distribution(distribution, rng) {
    let sum = 0;
    
    if (Array.isArray(distribution)) {
        for (let i = 0; i < distribution.length; ++i) {
            sum += $Math.abs(distribution[i]);
        }
    } else {
        // Object case
        for (let k in distribution) {
            if (k[0] !== '$') {
                sum += $Math.abs(distribution[k]);
            }
        }
    }

    if (sum === 0) { $error('random_from_distribution requires a non-empty object or array'); }

    // Choose a value
    let r = random(0, sum, rng);

    if (Array.isArray(distribution)) {
        for (let i = 0; i < distribution.length; ++i) {
            r -= $Math.abs(distribution[i]);
            if (r <= 0) { return i; }
        }
        return distribution.length - 1;
    } else {
        // Object case, check for hidden fields
        let lastKey;
        for (let k in distribution) {
            if (k[0] !== '$') {
                r -= $Math.abs(distribution[k]);
                lastKey = k;
                if (r <= 0) { return k; }
            }
        }
        return lastKey;
    }    
}