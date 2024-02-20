function repeated(input, repeats) {
    return {
        value: input.value.repeated(repeats),
        backward: function(outGrad) {
            input.backward(outGrad.sumOuter());
        }
    };
}