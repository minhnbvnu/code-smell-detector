function extractDepthwiseConvParams(numChannels, mappedPrefix) {
            var filters = tensor4d(extractWeights(3 * 3 * numChannels), [3, 3, numChannels, 1]);
            var batch_norm_scale = tensor1d(extractWeights(numChannels));
            var batch_norm_offset = tensor1d(extractWeights(numChannels));
            var batch_norm_mean = tensor1d(extractWeights(numChannels));
            var batch_norm_variance = tensor1d(extractWeights(numChannels));
            paramMappings.push({ paramPath: mappedPrefix + "/filters" }, { paramPath: mappedPrefix + "/batch_norm_scale" }, { paramPath: mappedPrefix + "/batch_norm_offset" }, { paramPath: mappedPrefix + "/batch_norm_mean" }, { paramPath: mappedPrefix + "/batch_norm_variance" });
            return {
                filters: filters,
                batch_norm_scale: batch_norm_scale,
                batch_norm_offset: batch_norm_offset,
                batch_norm_mean: batch_norm_mean,
                batch_norm_variance: batch_norm_variance
            };
        }