function extractMainBlockParams(mappedPrefix) {
            var separable_conv0 = extractSeparableConvParams(mappedPrefix + "/separable_conv0");
            var separable_conv1 = extractSeparableConvParams(mappedPrefix + "/separable_conv1");
            var separable_conv2 = extractSeparableConvParams(mappedPrefix + "/separable_conv2");
            return { separable_conv0: separable_conv0, separable_conv1: separable_conv1, separable_conv2: separable_conv2 };
        }