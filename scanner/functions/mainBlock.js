function mainBlock(x, params) {
        var out = depthwiseSeparableConv$1(Sl(x), params.separable_conv0, [1, 1]);
        out = depthwiseSeparableConv$1(Sl(out), params.separable_conv1, [1, 1]);
        out = depthwiseSeparableConv$1(Sl(out), params.separable_conv2, [1, 1]);
        out = Yu(out, x);
        return out;
    }