function extractInstancedAttributes(tile, featureTable, batchTable, instancesLength) {
    const collectionOptions = {
      instances: new Array(instancesLength),
      batchTable: tile._batchTable,
      cull: false,
      url: void 0,
      gltf: void 0,
      basePath: void 0,
      incrementallyLoadTextures: false,
      forwardAxis: [1, 0, 0]
    };
    const instances = collectionOptions.instances;
    const instancePosition = new Vector3();
    const instanceNormalRight = new Vector3();
    const instanceNormalUp = new Vector3();
    const instanceNormalForward = new Vector3();
    const instanceRotation = new Matrix3();
    const instanceQuaternion = new Quaternion();
    const instanceScale = new Vector3();
    const instanceTranslationRotationScale = {};
    const instanceTransform = new Matrix4();
    const scratch1 = [];
    const scratch2 = [];
    const scratchVector12 = new Vector3();
    const scratchVector24 = new Vector3();
    for (let i2 = 0; i2 < instancesLength; i2++) {
      let position;
      if (featureTable.hasProperty("POSITION")) {
        position = featureTable.getProperty("POSITION", GL2.FLOAT, 3, i2, instancePosition);
      } else if (featureTable.hasProperty("POSITION_QUANTIZED")) {
        position = featureTable.getProperty("POSITION_QUANTIZED", GL2.UNSIGNED_SHORT, 3, i2, instancePosition);
        const quantizedVolumeOffset = featureTable.getGlobalProperty("QUANTIZED_VOLUME_OFFSET", GL2.FLOAT, 3, scratchVector12);
        if (!quantizedVolumeOffset) {
          throw new Error("i3dm parser: QUANTIZED_VOLUME_OFFSET must be defined for quantized positions.");
        }
        const quantizedVolumeScale = featureTable.getGlobalProperty("QUANTIZED_VOLUME_SCALE", GL2.FLOAT, 3, scratchVector24);
        if (!quantizedVolumeScale) {
          throw new Error("i3dm parser: QUANTIZED_VOLUME_SCALE must be defined for quantized positions.");
        }
        const MAX_UNSIGNED_SHORT = 65535;
        for (let j = 0; j < 3; j++) {
          position[j] = position[j] / MAX_UNSIGNED_SHORT * quantizedVolumeScale[j] + quantizedVolumeOffset[j];
        }
      }
      if (!position) {
        throw new Error("i3dm: POSITION or POSITION_QUANTIZED must be defined for each instance.");
      }
      instancePosition.copy(position);
      instanceTranslationRotationScale.translation = instancePosition;
      tile.normalUp = featureTable.getProperty("NORMAL_UP", GL2.FLOAT, 3, i2, scratch1);
      tile.normalRight = featureTable.getProperty("NORMAL_RIGHT", GL2.FLOAT, 3, i2, scratch2);
      const hasCustomOrientation = false;
      if (tile.normalUp) {
        if (!tile.normalRight) {
          throw new Error("i3dm: Custom orientation requires both NORMAL_UP and NORMAL_RIGHT.");
        }
        tile.hasCustomOrientation = true;
      } else {
        tile.octNormalUp = featureTable.getProperty("NORMAL_UP_OCT32P", GL2.UNSIGNED_SHORT, 2, scratch1);
        tile.octNormalRight = featureTable.getProperty("NORMAL_RIGHT_OCT32P", GL2.UNSIGNED_SHORT, 2, scratch2);
        if (tile.octNormalUp) {
          if (!tile.octNormalRight) {
            throw new Error("i3dm: oct-encoded orientation requires NORMAL_UP_OCT32P and NORMAL_RIGHT_OCT32P");
          }
          throw new Error("i3dm: oct-encoded orientation not implemented");
        } else if (tile.eastNorthUp) {
          Ellipsoid.WGS84.eastNorthUpToFixedFrame(instancePosition, instanceTransform);
          instanceTransform.getRotationMatrix3(instanceRotation);
        } else {
          instanceRotation.identity();
        }
      }
      if (hasCustomOrientation) {
        instanceNormalForward.copy(instanceNormalRight).cross(instanceNormalUp).normalize();
        instanceRotation.setColumn(0, instanceNormalRight);
        instanceRotation.setColumn(1, instanceNormalUp);
        instanceRotation.setColumn(2, instanceNormalForward);
      }
      instanceQuaternion.fromMatrix3(instanceRotation);
      instanceTranslationRotationScale.rotation = instanceQuaternion;
      instanceScale.set(1, 1, 1);
      const scale5 = featureTable.getProperty("SCALE", GL2.FLOAT, 1, i2);
      if (Number.isFinite(scale5)) {
        instanceScale.multiplyByScalar(scale5);
      }
      const nonUniformScale = featureTable.getProperty("SCALE_NON_UNIFORM", GL2.FLOAT, 3, i2, scratch1);
      if (nonUniformScale) {
        instanceScale.scale(nonUniformScale);
      }
      instanceTranslationRotationScale.scale = instanceScale;
      let batchId = featureTable.getProperty("BATCH_ID", GL2.UNSIGNED_SHORT, 1, i2);
      if (batchId === void 0) {
        batchId = i2;
      }
      const rotationMatrix = new Matrix4().fromQuaternion(instanceTranslationRotationScale.rotation);
      instanceTransform.identity();
      instanceTransform.translate(instanceTranslationRotationScale.translation);
      instanceTransform.multiplyRight(rotationMatrix);
      instanceTransform.scale(instanceTranslationRotationScale.scale);
      const modelMatrix = instanceTransform.clone();
      instances[i2] = {
        modelMatrix,
        batchId
      };
    }
    tile.instances = instances;
  }