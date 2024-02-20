function convLayer(x, params, padding, withRelu) {
        if (padding === void 0) { padding = 'same'; }
        if (withRelu === void 0) { withRelu = false; }
        return tidy(function () {
            var out = add(conv2d(x, params.filters, [1, 1], padding), params.bias);
            return withRelu ? relu(out) : out;
        });
    }