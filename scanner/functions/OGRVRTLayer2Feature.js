function OGRVRTLayer2Feature(layer, data, crs, options) {
        const collection = new itowns.FeatureCollection(options.out);

        const _crs = (layer.LayerSRS && layer.LayerSRS.value) || crs;

        let type = itowns.FEATURE_TYPES.POINT;
        if (layer.GeometryType) {
            type = getGeometryType(layer.GeometryType.value);
        }

        const feature = collection.requestFeatureByType(type);

        if (layer.Field) {
            if (!layer.Field.length) {
                layer.Field = [layer.Field];
            }

            for (let f = 0; f < layer.Field.length; f++) {
                layer.Field[f]['@attributes'].pos = header.indexOf(layer.Field[f]['@attributes'].src);
            }
        }

        if (layer.GeometryField) {
            switch (layer.GeometryField['@attributes'].encoding) {
                case 'PointFromColumns': {
                    const x = header.indexOf(layer.GeometryField['@attributes'].x);
                    const y = header.indexOf(layer.GeometryField['@attributes'].y);
                    const z = header.indexOf(layer.GeometryField['@attributes'].z);
                    // const m = header.indexOf(layer.GeometryField['@attributes'].m);

                    for (let i = 0; i < data.length; i++) {
                        const line = data[i];
                        const geometry = feature.bindNewGeometry();

                        if (layer.Field) {
                            for (let p = 0; p < layer.Field.length; p++) {
                                geometry.properties[layer.Field[p]['@attributes'].name] = line[layer.Field[p]['@attributes'].pos];
                            }
                        }

                        geometry.startSubGeometry(1, feature);
                        coord.crs = (layer.GeometryField.SRS && layer.GeometryField.SRS.value) || _crs;
                        coord.setFromValues(Number(line[x]), Number(line[y]), Number(line[z]) || 0);
                        geometry.pushCoordinates(feature, coord);

                        geometry.updateExtent();
                        feature.updateExtent(geometry);
                    }

                    break;
                }
                case undefined:
                    break;
                default:
                    throw new Error('This type of encoding is not supported yet: ' + layer.GeometryField['@attributes'].encoding);
            }
        }

        collection.updateExtent();

        return collection;
    }