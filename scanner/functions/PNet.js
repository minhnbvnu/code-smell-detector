function PNet(x, params) {
        return tidy(function () {
            var out = sharedLayer(x, params, true);
            var conv = convLayer(out, params.conv4_1, 'valid');
            var max$$1 = expandDims(max(conv, 3), 3);
            var prob = softmax(sub(conv, max$$1), 3);
            var regions = convLayer(out, params.conv4_2, 'valid');
            return { prob: prob, regions: regions };
        });
    }