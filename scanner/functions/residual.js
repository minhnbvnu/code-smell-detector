function residual(x, params) {
        var out = conv(x, params.conv1);
        out = convNoRelu(out, params.conv2);
        out = add(out, x);
        out = relu(out);
        return out;
    }