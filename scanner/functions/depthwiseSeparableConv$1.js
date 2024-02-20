function depthwiseSeparableConv$1(x, params) {
        return tidy(function () {
            var out = pad(x, [[0, 0], [1, 1], [1, 1], [0, 0]]);
            out = separableConv2d(out, params.depthwise_filter, params.pointwise_filter, [1, 1], 'valid');
            out = add(out, params.bias);
            return leaky(out);
        });
    }