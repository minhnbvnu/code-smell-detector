function parseStreamPrimitive(primitives, streamName, time, convertPrimitive) {
  const {OBJECT_STREAM, preProcessPrimitive, DYNAMIC_STREAM_METADATA} = getXVIZConfig();
  const PRIMITIVE_SETTINGS =
    getXVIZConfig().currentMajorVersion === 1 ? XVIZPrimitiveSettingsV1 : XVIZPrimitiveSettingsV2;

  const primitiveData = getPrimitiveData(primitives);

  if (!primitiveData || !Array.isArray(primitiveData.primitives)) {
    return {};
  }

  const {type: primType, primitives: objects} = primitiveData;

  const primitiveMap = createPrimitiveMap();

  let category = null;
  // Primitives are an array of XVIZ objects
  for (let objectIndex = 0; objectIndex < objects.length; objectIndex++) {
    const object = objects[objectIndex];

    // array of primitives
    if (object && Array.isArray(object)) {
      category = PRIMITIVE_CAT.LOOKAHEAD;
      primitiveMap[category].push([]);

      for (let j = 0; j < object.length; j++) {
        // Apply custom XVIZ pre processing to this primitive
        preProcessPrimitive({primitive: object[j], streamName, time});

        // process each primitive
        const primitive = normalizeXVIZPrimitive(
          PRIMITIVE_SETTINGS,
          object[j],
          objectIndex,
          streamName,
          primType,
          time,
          convertPrimitive
        );
        if (primitive) {
          primitiveMap[category][objectIndex].push(primitive);
        }
      }
    } else {
      // single primitive

      // Apply custom XVIZ postprocessing to this primitive
      preProcessPrimitive({primitive: object, streamName, time});

      // normalize primitive
      const primitive = normalizeXVIZPrimitive(
        PRIMITIVE_SETTINGS,
        object,
        objectIndex,
        streamName,
        primType,
        time,
        convertPrimitive
      );

      // Allow for v1 inline type to override primitive type
      category = PRIMITIVE_SETTINGS[object.type || primType].category;
      if (primitive) {
        primitiveMap[category].push(primitive);

        if (
          isMainThread &&
          // OBJECT_STREAM is deprecated, only keeping for backward compatibility
          (streamName === OBJECT_STREAM ||
            (!OBJECT_STREAM && primitive.id && category === 'features'))
        ) {
          XVIZObject.observe(primitive.id, time);
        }
      }
    }
  }

  primitiveMap.vertices = joinFeatureVerticesToTypedArrays(primitiveMap.features);
  const pointCloud = joinObjectPointCloudsToTypedArrays(primitiveMap.pointCloud);
  if (pointCloud) {
    primitiveMap.features.push({
      type: pointCloud.type,
      points: pointCloud.positions,
      colors: pointCloud.colors,
      ids: pointCloud.ids
    });
  }
  // Backward compatibility
  primitiveMap.pointCloud = pointCloud;
  primitiveMap.time = time;

  if (DYNAMIC_STREAM_METADATA) {
    primitiveMap.__metadata = {
      category: 'PRIMITIVE',
      primitive_type: primType
    };
  }

  return primitiveMap;
}