function div(input1, input2) {
    return {
        value: input1.value.copy().div(input2.value),
        backward: function(outGrad) {
            input1.backward(outGrad.copy().div(input2.value));
            var denomGrad = outGrad.copy().mul(input1.value);
            denomGrad.div(input2.value).div(input2.value).scale(-1);
            input2.backward(denomGrad);
        }
    };
}