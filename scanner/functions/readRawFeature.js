function readRawFeature(pbf, layer, i) {
  pbf.pos = layer.features[i];
  const end = pbf.readVarint() + pbf.pos;

  const feature = {
    layer: layer,
    type: 0,
    properties: {},
  };
  pbf.readFields(featurePBFReader, feature, end);
  return feature;
}