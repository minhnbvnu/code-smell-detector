function applyDense(inputs, parameters) {
    var kernel = parameters[0];
    var bias = parameters[1];
    var output = jsnet.matmul(inputs, kernel);
    return jsnet.add(output, jsnet.broadcast(bias, output.value.shape));
}