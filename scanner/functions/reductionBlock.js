function reductionBlock(x, params, isActivateInput) {
        if (isActivateInput === void 0) { isActivateInput = true; }
        var out = isActivateInput ? Sl(x) : x;
        out = depthwiseSeparableConv$1(out, params.separable_conv0, [1, 1]);
        out = depthwiseSeparableConv$1(Sl(out), params.separable_conv1, [1, 1]);
        out = yu(out, [3, 3], [2, 2], 'same');
        out = Yu(out, conv(x, params.expansion_conv, [2, 2]));
        return out;
    }