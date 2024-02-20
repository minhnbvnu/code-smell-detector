function pow(input, power) {
    var result = input.value.copy();
    for (var i = 0; i < result.data.length; ++i) {
        result.data[i] = Math.pow(result.data[i], power);
    }
    return {
        value: result,
        backward: function(outGrad) {
            var inGrad = outGrad.copy();
            for (var i = 0; i < inGrad.data.length; ++i) {
                inGrad.data[i] *= power * Math.pow(input.value.data[i], power - 1);
            }
            input.backward(inGrad);
        }
    }
}