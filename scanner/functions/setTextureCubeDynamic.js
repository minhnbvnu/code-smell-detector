function setTextureCubeDynamic(texture, slot) {

    state.activeTexture(33984 + slot);
    state.bindTexture(34067, properties.get(texture).__webglTexture);

  }