function pool(input, f) {
    var poolVar = new Variable(input.value);
    var result = f(poolVar);
    return {
        value: result.value,
        backward: function(outGrad) {
            poolVar.clearGrad();
            result.backward(outGrad);
            input.backward(poolVar.gradient);
        }
    };
}