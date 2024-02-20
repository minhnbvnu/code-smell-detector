function applyNetwork(parameters, images) {
    var output = new jsnet.Variable(images);
    for (var i = 0; i < 4; ++i) {
        output = applyConv(output, parameters.slice(i*3, (i+1)*3));
    }
    output = jsnet.reshape(output, [
        output.value.shape[0],
        output.value.shape[1] * output.value.shape[2] * output.value.shape[3]
    ]);
    output = applyDense(output, parameters.slice(12, 14));
    return jsnet.logSoftmax(output);
}