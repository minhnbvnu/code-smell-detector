function broadcast(input, shape) {
    if (!canBroadcast(input.value.shape, shape)) {
        throw Error('cannot broadcast from shape [' + input.value.shape + '] to [' + shape + ']');
    }
    while (input.value.shape.length < shape.length) {
        input = repeated(input, shape[shape.length - input.value.shape.length - 1]);
    }
    return input;
}