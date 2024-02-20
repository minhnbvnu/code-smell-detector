function extractResidualLayerParams(prefix) {
            return {
                conv1: extractConvLayerParams(prefix + "/conv1"),
                conv2: extractConvLayerParams(prefix + "/conv2")
            };
        }