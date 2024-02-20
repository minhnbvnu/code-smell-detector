function offsetPermutation(time, factor, span, state) {
    let offset = Math.floor(time * (1 << span)) * factor;
    return (state + offset) & ((1 << span) - 1);
}