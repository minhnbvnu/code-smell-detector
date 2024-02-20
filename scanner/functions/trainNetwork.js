function trainNetwork(parameters, images, steps) {
    var losses = [];
    for (var i = 0; i < steps; ++i) {
        var outputs = applyNetwork(parameters, images);
        var loss = computeLoss(outputs);
        losses.push(loss.value.data[0]);
        loss.backward(new jsnet.Tensor([], [1]));
        for (var j = 0; j < parameters.length; ++j) {
            var param = parameters[j];
            param.gradient.mul(param.adamRate);
            param.gradient.scale(ADAM_LR);
            param.value.add(param.gradient);
            param.clearGrad();
        }
    }
    return losses;
}