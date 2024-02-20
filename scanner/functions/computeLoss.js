function computeLoss(outputs) {
    var ways = outputs.value.shape[0];
    var rawMask = [];
    for (var i = 0; i < ways; ++i) {
        for (var j = 0; j < ways; ++j) {
            if (i == j) {
                rawMask.push(1);
            } else {
                rawMask.push(0);
            }
        }
    }
    var mask = new jsnet.Tensor([ways, ways], rawMask);
    var masked = jsnet.mul(outputs, new jsnet.Variable(mask));
    return jsnet.sumOuter(jsnet.sumOuter(masked));
}