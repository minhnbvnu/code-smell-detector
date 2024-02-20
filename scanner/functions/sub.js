function sub(input1, input2) {
    return {
        value: input1.value.copy().sub(input2.value),
        backward: function(outGrad) {
            input1.backward(outGrad);
            input2.backward(outGrad.copy().scale(-1));
        }
    };
}