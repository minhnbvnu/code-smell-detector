function rescaleAndNormalize(x, scale) {
        return tidy(function () {
            var _a = getSizesForScale(scale, x.shape.slice(1)), height = _a.height, width = _a.width;
            var resized = image_ops.resizeBilinear(x, [height, width]);
            var normalized = normalize$1(resized);
            return transpose(normalized, [0, 2, 1, 3]);
        });
    }