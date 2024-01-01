function checkSetMap (texture) {
    // If the source has been changed, don't use loaded texture.
    if (shader.materialSrcs[materialName] !== src) { return; }
    setMap(texture);
  }