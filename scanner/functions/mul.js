function mul(input1, input2) {
    return {
        value: input1.value.copy().mul(input2.value),
        backward: function(outGrad) {
            input1.backward(outGrad.copy().mul(input2.value));
            input2.backward(outGrad.copy().mul(input1.value));
        }
    };
}