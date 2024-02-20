function reshape(input, shape) {
    return {
        value: input.value.copy().reshape(shape),
        backward: function(outGrad) {
            input.backward(outGrad.copy().reshape(input.value.shape));
        }
    };
}