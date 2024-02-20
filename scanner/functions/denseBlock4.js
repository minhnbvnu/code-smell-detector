function denseBlock4(x, denseBlockParams, isFirstLayer, isScaleDown) {
        if (isFirstLayer === void 0) { isFirstLayer = false; }
        if (isScaleDown === void 0) { isScaleDown = true; }
        return tidy(function () {
            var out1 = relu(isFirstLayer
                ? add(conv2d(x, denseBlockParams.conv0.filters, isScaleDown ? [2, 2] : [1, 1], 'same'), denseBlockParams.conv0.bias)
                : depthwiseSeparableConv(x, denseBlockParams.conv0, isScaleDown ? [2, 2] : [1, 1]));
            var out2 = depthwiseSeparableConv(out1, denseBlockParams.conv1, [1, 1]);
            var in3 = relu(add(out1, out2));
            var out3 = depthwiseSeparableConv(in3, denseBlockParams.conv2, [1, 1]);
            var in4 = relu(add(out1, add(out2, out3)));
            var out4 = depthwiseSeparableConv(in4, denseBlockParams.conv3, [1, 1]);
            return relu(add(out1, add(out2, add(out3, out4))));
        });
    }