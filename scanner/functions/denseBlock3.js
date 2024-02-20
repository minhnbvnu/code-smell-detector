function denseBlock3(x, denseBlockParams, isFirstLayer) {
        if (isFirstLayer === void 0) { isFirstLayer = false; }
        return tidy(function () {
            var out1 = relu(isFirstLayer
                ? add(conv2d(x, denseBlockParams.conv0.filters, [2, 2], 'same'), denseBlockParams.conv0.bias)
                : depthwiseSeparableConv(x, denseBlockParams.conv0, [2, 2]));
            var out2 = depthwiseSeparableConv(out1, denseBlockParams.conv1, [1, 1]);
            var in3 = relu(add(out1, out2));
            var out3 = depthwiseSeparableConv(in3, denseBlockParams.conv2, [1, 1]);
            return relu(add(out1, add(out2, out3)));
        });
    }