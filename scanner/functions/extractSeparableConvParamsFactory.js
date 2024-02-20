function extractSeparableConvParamsFactory(extractWeights, paramMappings) {
        return function (channelsIn, channelsOut, mappedPrefix) {
            var depthwise_filter = tensor4d(extractWeights(3 * 3 * channelsIn), [3, 3, channelsIn, 1]);
            var pointwise_filter = tensor4d(extractWeights(channelsIn * channelsOut), [1, 1, channelsIn, channelsOut]);
            var bias = tensor1d(extractWeights(channelsOut));
            paramMappings.push({ paramPath: mappedPrefix + "/depthwise_filter" }, { paramPath: mappedPrefix + "/pointwise_filter" }, { paramPath: mappedPrefix + "/bias" });
            return new SeparableConvParams(depthwise_filter, pointwise_filter, bias);
        };
    }