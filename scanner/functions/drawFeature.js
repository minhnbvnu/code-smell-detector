function drawFeature(ctx, feature, extent, invCtxScale) {
    const extentDim = extent.planarDimensions();
    const scaleRadius = extentDim.x / ctx.canvas.width;

    for (const geometry of feature.geometries) {
        if (Extent.intersectsExtent(geometry.extent, extent)) {
            context.setGeometry(geometry);

            if (
                feature.type === FEATURE_TYPES.POINT && style.point
            ) {
                // cross multiplication to know in the extent system the real size of
                // the point
                const px = (Math.round(style.point.radius * invCtxScale) || 3 * invCtxScale) * scaleRadius;
                for (const indice of geometry.indices) {
                    const offset = indice.offset * feature.size;
                    const count = offset + indice.count * feature.size;
                    for (let j = offset; j < count; j += feature.size) {
                        coord.setFromArray(feature.vertices, j);
                        if (extent.isPointInside(coord, px)) {
                            drawPoint(ctx, feature.vertices[j], feature.vertices[j + 1], invCtxScale);
                        }
                    }
                }
            } else {
                drawPolygon(ctx, feature.vertices, geometry.indices, feature.size, extent, invCtxScale, (feature.type == FEATURE_TYPES.POLYGON));
            }
        }
    }
}