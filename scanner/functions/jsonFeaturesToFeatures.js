function jsonFeaturesToFeatures(crsIn, jsonFeatures, options) {
    const collection = new FeatureCollection(options);

    const filter = options.filter || (() => true);

    for (const jsonFeature of jsonFeatures) {
        if (filter(jsonFeature.properties, jsonFeature.geometry)) {
            jsonFeatureToFeature(crsIn, jsonFeature, collection);
        }
    }

    collection.removeEmptyFeature();
    collection.updateExtent();

    return collection;
}