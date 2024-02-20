function object3DHasFeature(object3d) {
    return object3d.geometry && object3d.geometry.attributes._BATCHID;
}