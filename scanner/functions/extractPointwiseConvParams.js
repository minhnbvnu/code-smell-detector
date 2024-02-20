function extractPointwiseConvParams(prefix, idx, mappedPrefix) {
            var filters = extractWeightEntry(prefix + "/Conv2d_" + idx + "_pointwise/weights", 4, mappedPrefix + "/filters");
            var batch_norm_offset = extractWeightEntry(prefix + "/Conv2d_" + idx + "_pointwise/convolution_bn_offset", 1, mappedPrefix + "/batch_norm_offset");
            return { filters: filters, batch_norm_offset: batch_norm_offset };
        }