function readFeatureCollection(pbf, obj) {
    obj.type = 'FeatureCollection';
    obj.features = [];
    return pbf.readMessage(readFeatureCollectionField, obj);
}