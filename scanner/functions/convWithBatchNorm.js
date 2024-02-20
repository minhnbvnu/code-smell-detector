function convWithBatchNorm(x, params) {
        return tidy(function () {
            var out = pad(x, [[0, 0], [1, 1], [1, 1], [0, 0]]);
            out = conv2d(out, params.conv.filters, [1, 1], 'valid');
            out = sub(out, params.bn.sub);
            out = mul(out, params.bn.truediv);
            out = add(out, params.conv.bias);
            return leaky(out);
        });
    }