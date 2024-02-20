function isInside(inner, outer) {
        return inner.range[0] >= outer.range[0] && inner.range[1] <= outer.range[1];
    }