function ONet(x, params) {
        return tidy(function () {
            var out = sharedLayer(x, params);
            out = maxPool(out, [2, 2], [2, 2], 'same');
            out = convLayer(out, params.conv4, 'valid');
            out = prelu$1(out, params.prelu4_alpha);
            var vectorized = reshape(out, [out.shape[0], params.fc1.weights.shape[0]]);
            var fc1 = fullyConnectedLayer(vectorized, params.fc1);
            var prelu5 = prelu$1(fc1, params.prelu5_alpha);
            var fc2_1 = fullyConnectedLayer(prelu5, params.fc2_1);
            var max$$1 = expandDims(max(fc2_1, 1), 1);
            var prob = softmax(sub(fc2_1, max$$1), 1);
            var regions = fullyConnectedLayer(prelu5, params.fc2_2);
            var points = fullyConnectedLayer(prelu5, params.fc2_3);
            var scores = unstack(prob, 1)[1];
            return { scores: scores, regions: regions, points: points };
        });
    }