function randomInit(numClasses) {
    var parameters = [];
    for (var i = 0; i < 4; ++i) {
        var inChans = [1, 24, 24, 24][i];
        var filters = [];
        var gamma = [];
        var beta = [];
        for (var j = 0; j < inChans * 3 * 3 * 24; ++j) {
            filters.push((Math.random() - 0.5) / 50);
        }
        for (var j = 0; j < 24; ++j) {
            gamma.push(1);
            beta.push(0);
        }
        parameters.push(new jsnet.Variable(new jsnet.Tensor([3, 3, inChans, 24], filters)));
        parameters.push(new jsnet.Variable(new jsnet.Tensor([24], gamma)));
        parameters.push(new jsnet.Variable(new jsnet.Tensor([24], beta)));
    }
    var weightMatrix = [];
    for (var i = 0; i < 96 * numClasses; ++i) {
        weightMatrix.push((Math.random() - 0.5) / 10);
    }
    parameters.push(new jsnet.Variable(new jsnet.Tensor([96, numClasses], weightMatrix)));
    var biases = [];
    for (var i = 0; i < numClasses; ++i) {
        biases.push(0);
    }
    parameters.push(new jsnet.Variable(new jsnet.Tensor([numClasses], biases)));

    var adamScales = [
        3.238116836475661,
        5.385047353671038,
        5.637935420477302,
        70.68438036761029,
        5.614735134965089,
        5.880044363499613,
        52.143705309651224,
        3.306547626966237,
        5.350009339356334,
        1.8687280293343194,
        2.591797130259263,
        2.9093116107992216,
        8.542032513733227,
        2.2572890209671423
    ];

    for (var i = 0; i < parameters.length; ++i) {
        var param = parameters[i];
        var scales = [];
        for (var j = 0; j < param.value.data.length; ++j) {
            scales.push(adamScales[i]);
        }
        parameters[i].adamRate = new jsnet.Tensor(param.value.shape, scales);
    }

    return parameters;
}