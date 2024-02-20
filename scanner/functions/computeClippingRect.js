function computeClippingRect(el) {
        return getClippingParents(el)
            .map(function (el) {
            return computeInnerRect(el);
        })
            .concat(computeViewportRect())
            .reduce(function (rect0, rect1) {
            return intersectRects(rect0, rect1) || rect1; // should always intersect
        });
    }