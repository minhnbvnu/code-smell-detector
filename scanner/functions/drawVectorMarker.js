function drawVectorMarker(ctx, point, symbol, resources) {
    const strokeAndFill = translateMarkerLineAndFill(symbol);
    const style = symbol,
        markerType = style['markerType'].toLowerCase(),
        vectorArray = getVectorMarkerPoints(markerType, style['markerWidth'], style['markerHeight']),
        lineOpacity = strokeAndFill['lineOpacity'],
        fillOpacity = strokeAndFill['polygonOpacity'];
    const gradient = isGradient(strokeAndFill['polygonFill']);
    if (gradient) {
        let gradientExtent;
        if (isGradient(strokeAndFill['polygonFill'])) {
            if (!gradientExtent) {
                gradientExtent = getGraidentExtent(point, style.markerWidth, style.markerHeight);
            }
            strokeAndFill['polygonGradientExtent'] = gradientExtent;
        }
    }
    Canvas.prepareCanvas(ctx, strokeAndFill, resources);

    const width = style['markerWidth'],
        height = style['markerHeight'],
        hLineWidth = style['markerLineWidth'] / 2;
    if (markerType === 'ellipse') {
        //ellipse default
        Canvas.ellipse(ctx, point, width / 2, height / 2, height / 2, lineOpacity, fillOpacity);
    } else if (markerType === 'cross' || markerType === 'x') {
        for (let j = vectorArray.length - 1; j >= 0; j--) {
            vectorArray[j]._add(point);
        }
        //线类型
        Canvas.path(ctx, vectorArray.slice(0, 2), lineOpacity);
        Canvas.path(ctx, vectorArray.slice(2, 4), lineOpacity);
    } else if (markerType === 'diamond' || markerType === 'bar' || markerType === 'square' || markerType === 'rectangle' || markerType === 'triangle') {
        if (markerType === 'bar') {
            point = point.add(0, -hLineWidth);
        } else if (markerType === 'rectangle') {
            point = point.add(hLineWidth, hLineWidth);
        }
        for (let j = vectorArray.length - 1; j >= 0; j--) {
            vectorArray[j]._add(point);
        }
        //面类型
        Canvas.polygon(ctx, vectorArray, lineOpacity, fillOpacity);
    } else if (markerType === 'pin') {
        point = point.add(0, -hLineWidth);
        for (let j = vectorArray.length - 1; j >= 0; j--) {
            vectorArray[j]._add(point);
        }
        const lineCap = ctx.lineCap;
        ctx.lineCap = 'round'; //set line cap to round to close the pin bottom
        Canvas.bezierCurveAndFill(ctx, vectorArray, lineOpacity, fillOpacity);
        ctx.lineCap = lineCap;
    } else if (markerType === 'pie') {
        point = point.add(0, -hLineWidth);
        const angle = Math.atan(width / 2 / height) * 180 / Math.PI;
        const lineCap = ctx.lineCap;
        ctx.lineCap = 'round';
        Canvas.sector(ctx, point, height, [90 - angle, 90 + angle], lineOpacity, fillOpacity);
        ctx.lineCap = lineCap;
    } else {
        throw new Error('unsupported markerType: ' + markerType);
    }
    return ctx.canvas;
}