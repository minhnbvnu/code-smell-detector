function sharedLayer(x, params, isPnet) {
        if (isPnet === void 0) { isPnet = false; }
        return tidy(function () {
            var out = convLayer(x, params.conv1, 'valid');
            out = prelu$1(out, params.prelu1_alpha);
            out = maxPool(out, isPnet ? [2, 2] : [3, 3], [2, 2], 'same');
            out = convLayer(out, params.conv2, 'valid');
            out = prelu$1(out, params.prelu2_alpha);
            out = isPnet ? out : maxPool(out, [3, 3], [2, 2], 'valid');
            out = convLayer(out, params.conv3, 'valid');
            out = prelu$1(out, params.prelu3_alpha);
            return out;
        });
    }