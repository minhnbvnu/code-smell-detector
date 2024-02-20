function loadParamsFactory$1(weightMap, paramMappings) {
        var extractWeightEntry = extractWeightEntryFactory(weightMap, paramMappings);
        var extractConvParams = loadConvParamsFactory(extractWeightEntry);
        var extractSeparableConvParams = loadSeparableConvParamsFactory(extractWeightEntry);
        function extractReductionBlockParams(mappedPrefix) {
            var separable_conv0 = extractSeparableConvParams(mappedPrefix + "/separable_conv0");
            var separable_conv1 = extractSeparableConvParams(mappedPrefix + "/separable_conv1");
            var expansion_conv = extractConvParams(mappedPrefix + "/expansion_conv");
            return { separable_conv0: separable_conv0, separable_conv1: separable_conv1, expansion_conv: expansion_conv };
        }
        function extractMainBlockParams(mappedPrefix) {
            var separable_conv0 = extractSeparableConvParams(mappedPrefix + "/separable_conv0");
            var separable_conv1 = extractSeparableConvParams(mappedPrefix + "/separable_conv1");
            var separable_conv2 = extractSeparableConvParams(mappedPrefix + "/separable_conv2");
            return { separable_conv0: separable_conv0, separable_conv1: separable_conv1, separable_conv2: separable_conv2 };
        }
        return {
            extractConvParams: extractConvParams,
            extractSeparableConvParams: extractSeparableConvParams,
            extractReductionBlockParams: extractReductionBlockParams,
            extractMainBlockParams: extractMainBlockParams
        };
    }