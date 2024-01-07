function isPowerOfTwo(value) {
    return (value & (value - 1)) === 0 && value !== 0;
}