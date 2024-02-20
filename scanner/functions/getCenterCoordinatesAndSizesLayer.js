function getCenterCoordinatesAndSizesLayer(x) {
        var vec = unstack(transpose(x, [1, 0]));
        var sizes = [
            sub(vec[2], vec[0]),
            sub(vec[3], vec[1])
        ];
        var centers = [
            add(vec[0], div(sizes[0], scalar(2))),
            add(vec[1], div(sizes[1], scalar(2)))
        ];
        return {
            sizes: sizes,
            centers: centers
        };
    }