function computeSSEPerspective(context, pointSize, spacing, elt, distance) {
    if (distance <= 0) {
        return Infinity;
    }
    const pointSpacing = spacing / 2 ** elt.depth;
    // Estimate the onscreen distance between 2 points
    const onScreenSpacing = context.camera.preSSE * pointSpacing / distance;
    // [  P1  ]--------------[   P2   ]
    //     <--------------------->      = pointsSpacing (in world coordinates)
    //                                  ~ onScreenSpacing (in pixels)
    // <------>                         = pointSize (in pixels)
    return Math.max(0.0, onScreenSpacing - pointSize);
}