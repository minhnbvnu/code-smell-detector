function pointwiseConvLayer(x, params, strides) {
        return tidy(function () {
            var out = conv2d(x, params.filters, strides, 'same');
            out = add(out, params.batch_norm_offset);
            return clipByValue(out, 0, 6);
        });
    }