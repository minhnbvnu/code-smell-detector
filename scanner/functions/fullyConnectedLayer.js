function fullyConnectedLayer(x, params) {
        return tidy(function () {
            return add(matMul(x, params.weights), params.bias);
        });
    }