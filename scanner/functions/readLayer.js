function readLayer(layer, data, options, crs) {
        if (layer.OGRVRTLayer) {
            return OGRVRTLayer2Feature(layer.OGRVRTLayer, data, layer.TargetSRS.value, options);
        } else if (layer.OGRVRTWarpedLayer) {
            return OGRVRTWarpedLayer2Feature(layer, data, options, crs);
        } else if (layer.OGRVRTUnionLayer) {
            return OGRVRTUnionLayer2Feature(layer, data, options, crs);
        }
    }