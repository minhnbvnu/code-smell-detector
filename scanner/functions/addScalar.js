function addScalar(input, scalar) {
    return {
        value: input.value.copy().addScalar(scalar),
        backward: function(outGrad) {
            input.backward(outGrad);
        }
    };
}