function decodeBoxesLayer(x0, x1) {
        var _a = getCenterCoordinatesAndSizesLayer(x0), sizes = _a.sizes, centers = _a.centers;
        var vec = unstack(transpose(x1, [1, 0]));
        var div0_out = div(mul(exp(div(vec[2], scalar(5))), sizes[0]), scalar(2));
        var add0_out = add(mul(div(vec[0], scalar(10)), sizes[0]), centers[0]);
        var div1_out = div(mul(exp(div(vec[3], scalar(5))), sizes[1]), scalar(2));
        var add1_out = add(mul(div(vec[1], scalar(10)), sizes[1]), centers[1]);
        return transpose(stack([
            sub(add0_out, div0_out),
            sub(add1_out, div1_out),
            add(add0_out, div0_out),
            add(add1_out, div1_out)
        ]), [1, 0]);
    }