function jsonFeatureToFeature(crsIn, json, collection) {
    if (!json.geometry?.type) {
        console.warn('No geometry provided');
        return null;
    }

    const jsonType = json.geometry.type.toLowerCase();
    const featureType = toFeatureType(jsonType);
    const feature = collection.requestFeatureByType(featureType);
    const coordinates = jsonType != 'point' ? json.geometry.coordinates : [json.geometry.coordinates];
    const properties = json.properties || {};
    feature.hasRawElevationData = firstCoordinates(coordinates)?.length === 3;

    // copy other properties
    for (const key of Object.keys(json)) {
        if (!keyProperties.includes(key.toLowerCase())) {
            // create `geojson` key if it does not exist yet
            properties.geojson = properties.geojson || {};
            // add key defined property to `geojson` property
            properties.geojson[key] = json[key];
        }
    }

    coordinatesToFeature(jsonType, feature, crsIn, coordinates, collection, properties);

    return feature;
}