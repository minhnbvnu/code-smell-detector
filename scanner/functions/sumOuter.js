function sumOuter(input) {
    if (input.value.shape.length === 0) {
        return input;
    }
    return {
        value: input.value.sumOuter(),
        backward: function(outGrad) {
            input.backward(outGrad.repeated(input.value.shape[0]));
        }
    };
}