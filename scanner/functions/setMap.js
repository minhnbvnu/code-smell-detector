function setMap (texture) {
    var slot = shortType + 'Map';
    material[slot] = texture;
    if (texture && COLOR_MAPS.has(slot)) {
      rendererSystem.applyColorCorrection(texture);
    }
    if (texture) {
      setTextureProperties(texture, data);
    }
    material.needsUpdate = true;
    handleTextureEvents(el, texture);
  }