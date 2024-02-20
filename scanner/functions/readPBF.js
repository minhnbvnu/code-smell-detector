function readPBF(file, options) {
    options.out = options.out || {};
    const vectorTile = new VectorTile(new Protobuf(file));
    const sourceLayers = Object.keys(vectorTile.layers);

    if (sourceLayers.length < 1) {
        return;
    }

    // x,y,z tile coordinates
    const x = file.extent.col;
    const z = file.extent.zoom;
    // We need to move from TMS to Google/Bing/OSM coordinates
    // https://alastaira.wordpress.com/2011/07/06/converting-tms-tile-coordinates-to-googlebingosm-tile-coordinates/
    // Only if the layer.origin is top
    const y = options.in.isInverted ? file.extent.row : (1 << z) - file.extent.row - 1;

    const collection = new FeatureCollection(options.out);

    const vFeature = vectorTile.layers[sourceLayers[0]];
    // TODO: verify if size is correct because is computed with only one feature (vFeature).
    const size = vFeature.extent * 2 ** z;
    const center = -0.5 * size;

    collection.scale.set(globalExtent.x / size, -globalExtent.y / size, 1);
    collection.position.set(vFeature.extent * x + center, vFeature.extent * y + center, 0).multiply(collection.scale);
    collection.updateMatrixWorld();

    sourceLayers.forEach((layer_id) => {
        if (!options.in.layers[layer_id]) { return; }

        const sourceLayer = vectorTile.layers[layer_id];

        for (let i = sourceLayer.length - 1; i >= 0; i--) {
            const vtFeature = sourceLayer.feature(i);
            vtFeature.tileNumbers = { x, y: file.extent.row, z };
            const layers = options.in.layers[layer_id].filter(l => l.filterExpression.filter({ zoom: z }, vtFeature) && z >= l.zoom.min && z < l.zoom.max);
            let feature;

            for (const layer of layers) {
                if (!feature) {
                    feature = collection.requestFeatureById(layer.id, vtFeature.type - 1);
                    feature.id = layer.id;
                    feature.order = layer.order;
                    feature.style = options.in.styles[feature.id];
                    vtFeatureToFeatureGeometry(vtFeature, feature);
                } else if (!collection.features.find(f => f.id === layer.id)) {
                    feature = collection.newFeatureByReference(feature);
                    feature.id = layer.id;
                    feature.order = layer.order;
                    feature.style = options.in.styles[feature.id];
                }
            }
        }
    });

    collection.removeEmptyFeature();
    // TODO Some vector tiles are already sorted
    collection.features.sort((a, b) => a.order - b.order);
    // TODO verify if is needed to updateExtent for previous features.
    collection.updateExtent();
    collection.extent = file.extent;
    collection.isInverted = options.in.isInverted;
    return Promise.resolve(collection);
}