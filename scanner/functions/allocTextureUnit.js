function allocTextureUnit() {

    var textureUnit = _usedTextureUnits;

    if (textureUnit >= capabilities.maxTextures) {

      console.warn('THREE.WebGLRenderer: Trying to use ' + textureUnit + ' texture units while this GPU supports only ' + capabilities.maxTextures);

    }

    _usedTextureUnits += 1;

    return textureUnit;

  }