function convLayer$1(x, params, strides, withRelu, padding) {
        if (padding === void 0) { padding = 'same'; }
        var _a = params.conv, filters = _a.filters, bias = _a.bias;
        var out = conv2d(x, filters, strides, padding);
        out = add(out, bias);
        out = scale(out, params.scale);
        return withRelu ? relu(out) : out;
    }