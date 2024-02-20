function weightedAverage(nums, weights) {
    if (nums.length === 0) {
        return '0'.BN;
    }
    const [sum, weightSum] = weights.reduce(
        (acc, w, i) => {
            acc[0] = acc[0].add(nums[i].mul(w));
            acc[1] = acc[1].add(w);
            return acc;
        },
        ['0'.BN, '0'.BN],
    );
    return sum.div(weightSum);
}