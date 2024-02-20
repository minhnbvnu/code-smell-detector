function depthwiseConvLayer(x, params, strides) {
        return tidy(function () {
            var out = depthwiseConv2d(x, params.filters, strides, 'same');
            out = batchNormalization(out, params.batch_norm_mean, params.batch_norm_variance, epsilon, params.batch_norm_scale, params.batch_norm_offset);
            return clipByValue(out, 0, 6);
        });
    }