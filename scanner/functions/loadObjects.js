function loadObjects(objects, instances) {
  return objects.reduce((resMap, object) => {
    if (!resMap[object.sample_token]) {
      resMap[object.sample_token] = {};
    }

    // sample_token is unique id for a log sample
    // instance_token is unique id for an object across different frames of the sample
    resMap[object.sample_token][object.instance_token] = parseObjectMetadata(object, instances);
    return resMap;
  }, {});
}