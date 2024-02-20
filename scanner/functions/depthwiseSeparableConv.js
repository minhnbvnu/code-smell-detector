function depthwiseSeparableConv(x, params, stride) {
        return tidy(function () {
            var out = separableConv2d(x, params.depthwise_filter, params.pointwise_filter, stride, 'same');
            out = add(out, params.bias);
            return out;
        });
    }