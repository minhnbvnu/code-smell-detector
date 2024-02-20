function getExtension(name) {
    return name === 'OES_texture_float_linear'
      ? getOESTextureFloatLinear(this)
      : oldGetExtension.call(this, name);
  }