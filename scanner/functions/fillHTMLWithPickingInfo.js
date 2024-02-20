function fillHTMLWithPickingInfo(event, pickingArg) {
    if (!pickingArg.layer.isC3DTilesLayer) {
        console.warn('Function fillHTMLWithPickingInfo only works' +
            ' for C3DTilesLayer layers.');
        return;
    }

    // Remove content already in html div
    while (pickingArg.htmlDiv.firstChild) {
        pickingArg.htmlDiv.removeChild(pickingArg.htmlDiv.firstChild);
    }

    // Get intersected objects
    const intersects = pickingArg.view.pickObjectsAt(event, 5, pickingArg.layer);
    if (intersects.length === 0) { return; }

    // Get information from intersected objects (from the batch table and
    // eventually the 3D Tiles extensions
    const closestC3DTileFeature = pickingArg.layer.getC3DTileFeatureFromIntersectsArray(intersects);

    if (closestC3DTileFeature) {
        // eslint-disable-next-line
        pickingArg.htmlDiv.appendChild(createHTMLListFromObject(closestC3DTileFeature.getInfo()));
    }
}