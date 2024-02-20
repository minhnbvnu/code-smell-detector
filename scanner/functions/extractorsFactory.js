function extractorsFactory(extractWeights, paramMappings) {
        var extractConvParams = extractConvParamsFactory(extractWeights, paramMappings);
        function extractBatchNormParams(size, mappedPrefix) {
            var sub$$1 = tensor1d(extractWeights(size));
            var truediv = tensor1d(extractWeights(size));
            paramMappings.push({ paramPath: mappedPrefix + "/sub" }, { paramPath: mappedPrefix + "/truediv" });
            return { sub: sub$$1, truediv: truediv };
        }
        function extractConvWithBatchNormParams(channelsIn, channelsOut, mappedPrefix) {
            var conv = extractConvParams(channelsIn, channelsOut, 3, mappedPrefix + "/conv");
            var bn = extractBatchNormParams(channelsOut, mappedPrefix + "/bn");
            return { conv: conv, bn: bn };
        }
        var extractSeparableConvParams = extractSeparableConvParamsFactory(extractWeights, paramMappings);
        return {
            extractConvParams: extractConvParams,
            extractConvWithBatchNormParams: extractConvWithBatchNormParams,
            extractSeparableConvParams: extractSeparableConvParams
        };
    }