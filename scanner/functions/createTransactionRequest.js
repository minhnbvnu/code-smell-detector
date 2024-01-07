function createTransactionRequest(node, baseObj, version, options) {
  const featurePrefix = options.featurePrefix
    ? options.featurePrefix
    : FEATURE_PREFIX;
  let gmlVersion;
  if (version === '1.0.0') {
    gmlVersion = 2;
  } else if (version === '1.1.0') {
    gmlVersion = 3;
  } else if (version === '2.0.0') {
    gmlVersion = 3.2;
  }
  const obj = Object.assign(
    {node},
    {
      version,
      'featureNS': options.featureNS,
      'featureType': options.featureType,
      'featurePrefix': featurePrefix,
      'gmlVersion': gmlVersion,
      'hasZ': options.hasZ,
      'srsName': options.srsName,
    },
    baseObj,
  );
  return obj;
}