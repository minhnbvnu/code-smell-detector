function extractReductionBlockParams(mappedPrefix) {
            var separable_conv0 = extractSeparableConvParams(mappedPrefix + "/separable_conv0");
            var separable_conv1 = extractSeparableConvParams(mappedPrefix + "/separable_conv1");
            var expansion_conv = extractConvParams(mappedPrefix + "/expansion_conv");
            return { separable_conv0: separable_conv0, separable_conv1: separable_conv1, expansion_conv: expansion_conv };
        }