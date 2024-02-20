function applyConv(inputs, parameters, i) {
    var kernel = parameters[0];
    var gamma = parameters[1];
    var beta = parameters[2];
    var output = inputs;
    if (output.value.shape[1] % 2 === 1) {
        output = jsnet.padImages(inputs, 1, 1, 1, 1);
    } else {
        output = jsnet.padImages(inputs, 0, 1, 1, 0);
    }
    output = jsnet.conv2d(output, kernel, 2, 2);
    output = jsnet.normalizeChannels(output);
    output = jsnet.mul(output, jsnet.broadcast(gamma, output.value.shape));
    output = jsnet.add(output, jsnet.broadcast(beta, output.value.shape));
    return jsnet.relu(output);
}