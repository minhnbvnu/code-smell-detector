function normalizeChannels(input, epsilon) {
    epsilon = epsilon || DEFAULT_EPSILON;
    return pool(input, function(input) {
        var centered = sub(input, broadcast(channelMean(input), input.value.shape));
        var variance = addScalar(channelMean(square(centered)), epsilon);
        return mul(centered, broadcast(rsqrt(variance), input.value.shape));
    });
}