function residualDown(x, params) {
        var out = convDown(x, params.conv1);
        out = convNoRelu(out, params.conv2);
        var pooled = avgPool(x, 2, 2, 'valid');
        var zeros$$1 = zeros(pooled.shape);
        var isPad = pooled.shape[3] !== out.shape[3];
        var isAdjustShape = pooled.shape[1] !== out.shape[1] || pooled.shape[2] !== out.shape[2];
        if (isAdjustShape) {
            var padShapeX = out.shape.slice();
            padShapeX[1] = 1;
            var zerosW = zeros(padShapeX);
            out = concat([out, zerosW], 1);
            var padShapeY = out.shape.slice();
            padShapeY[2] = 1;
            var zerosH = zeros(padShapeY);
            out = concat([out, zerosH], 2);
        }
        pooled = isPad ? concat([pooled, zeros$$1], 3) : pooled;
        out = add(pooled, out);
        out = relu(out);
        return out;
    }