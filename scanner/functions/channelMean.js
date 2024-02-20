function channelMean(input) {
    var count = 1;
    while (input.value.shape.length > 1) {
        count *= input.value.shape[0];
        input = sumOuter(input);
    }
    return scale(input, 1 / count);
}