function setTextureProperties (texture, data) {
  var offset = data.offset || {x: 0, y: 0};
  var repeat = data.repeat || {x: 1, y: 1};
  var npot = data.npot || false;
  var anisotropy = data.anisotropy || 0;
  // To support NPOT textures, wrap must be ClampToEdge (not Repeat),
  // and filters must not use mipmaps (i.e. Nearest or Linear).
  if (npot) {
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.LinearFilter;
  }

  // Don't bother setting repeat if it is 1/1. Power-of-two is required to repeat.
  if (repeat.x !== 1 || repeat.y !== 1) {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(repeat.x, repeat.y);
  }
  // Don't bother setting offset if it is 0/0.
  if (offset.x !== 0 || offset.y !== 0) {
    texture.offset.set(offset.x, offset.y);
  }

  // Only set anisotropy if it isn't 0, which indicates that the default value should be used.
  if (anisotropy !== 0) {
    texture.anisotropy = anisotropy;
  }
}