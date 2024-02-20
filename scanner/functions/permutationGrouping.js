function permutationGrouping(knownBitPermutationFunc, height) {
    let seen = new Set();
    let result = [];
    for (let i = 0; i < height; i++) {
        let mask = 0;
        let j = i;
        while (!seen.has(j)) {
            seen.add(j);
            mask |= 1 << j;
            j = knownBitPermutationFunc(j);
        }
        if (mask !== 0) {
            result.push(mask);
        }
    }
    return result;
}