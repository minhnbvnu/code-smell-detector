function trainedInit() {
    var result = [];

    for (var i = 0; i < trainedParameters.length; i += 2) {
        var param = new jsnet.Variable(trainedParameters[i].copy());
        param.adamRate = trainedParameters[i + 1].copy();
        for (var j = 0; j < param.adamRate.data.length; ++j) {
            param.adamRate.data[j] = 1 / (Math.sqrt(param.adamRate.data[j]) + 1e-5);
        }
        result.push(param);
    }

    return result;
}