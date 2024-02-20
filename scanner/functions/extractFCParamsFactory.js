function extractFCParamsFactory(extractWeights, paramMappings) {
        return function (channelsIn, channelsOut, mappedPrefix) {
            var fc_weights = tensor2d(extractWeights(channelsIn * channelsOut), [channelsIn, channelsOut]);
            var fc_bias = tensor1d(extractWeights(channelsOut));
            paramMappings.push({ paramPath: mappedPrefix + "/weights" }, { paramPath: mappedPrefix + "/bias" });
            return {
                weights: fc_weights,
                bias: fc_bias
            };
        };
    }