function readFeature(pbf, feature) {
    feature.type = 'Feature';
    var f = pbf.readMessage(readFeatureField, feature);
    if (!('geometry' in f)) f.geometry = null;
    return f;
}