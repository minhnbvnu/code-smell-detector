function vtFeatureToFeatureGeometry(vtFeature, feature, classify = false) {
    let geometry = feature.bindNewGeometry();
    const isPolygon = feature.type === FEATURE_TYPES.POLYGON;
    classify = classify && isPolygon;

    geometry.properties = vtFeature.properties;
    const pbf = vtFeature._pbf;
    pbf.pos = vtFeature._geometry;

    const end = pbf.readVarint() + pbf.pos;
    let cmd = 1;
    let length = 0;
    let x = 0;
    let y = 0;
    let count = 0;
    let sum = 0;

    while (pbf.pos < end) {
        if (length <= 0) {
            const cmdLen = pbf.readVarint();
            cmd = cmdLen & 0x7;
            length = cmdLen >> 3;
        }

        length--;

        if (cmd === 1 || cmd === 2) {
            x += pbf.readSVarint();
            y += pbf.readSVarint();

            if (cmd === 1) {
                if (count) {
                    if (classify && sum > 0 && geometry.indices.length > 0) {
                        feature.updateExtent(geometry);
                        geometry = feature.bindNewGeometry();
                        geometry.properties = vtFeature.properties;
                    }
                    geometry.closeSubGeometry(count, feature);
                    geometry.getLastSubGeometry().ccw = sum < 0;
                }
                count = 0;
                sum = 0;
            }
            count++;
            const coordProj = project(
                x,
                y,
                vtFeature.tileNumbers,
                vtFeature.extent);
            geometry.pushCoordinatesValues(feature, { x, y }, coordProj);
            if (count == 1) {
                firstPoint.set(x, y);
                firstPoint.coordProj = coordProj;
                lastPoint.set(x, y);
            } else if (isPolygon && count > 1) {
                sum += (lastPoint.x - x) * (lastPoint.y + y);
                lastPoint.set(x, y);
            }
        } else if (cmd === 7) {
            if (count) {
                count++;
                geometry.pushCoordinatesValues(feature, { x: firstPoint.x, y: firstPoint.y }, firstPoint.coordProj);
                if (isPolygon) {
                    sum += (lastPoint.x - firstPoint.x) * (lastPoint.y + firstPoint.y);
                }
            }
        } else {
            throw new Error(`unknown command ${cmd}`);
        }
    }

    if (count) {
        if (classify && sum > 0 && geometry.indices.length > 0) {
            feature.updateExtent(geometry);
            geometry = feature.bindNewGeometry();
            geometry.properties = vtFeature.properties;
        }
        geometry.closeSubGeometry(count, feature);
        geometry.getLastSubGeometry().ccw = sum < 0;
    }
    feature.updateExtent(geometry);
}