function RNet(x, params) {
        return tidy(function () {
            var convOut = sharedLayer(x, params);
            var vectorized = reshape(convOut, [convOut.shape[0], params.fc1.weights.shape[0]]);
            var fc1 = fullyConnectedLayer(vectorized, params.fc1);
            var prelu4 = prelu$1(fc1, params.prelu4_alpha);
            var fc2_1 = fullyConnectedLayer(prelu4, params.fc2_1);
            var max$$1 = expandDims(max(fc2_1, 1), 1);
            var prob = softmax(sub(fc2_1, max$$1), 1);
            var regions = fullyConnectedLayer(prelu4, params.fc2_2);
            var scores = unstack(prob, 1)[1];
            return { scores: scores, regions: regions };
        });
    }