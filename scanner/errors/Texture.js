function Texture(width, height, options) {
  options = options || {};
  this.id = gl.createTexture();
  this.width = width;
  this.height = height;
  this.format = options.format || gl.RGBA;
  this.type = options.type || gl.UNSIGNED_BYTE;
  var magFilter = options.filter || options.magFilter || gl.LINEAR;
  var minFilter = options.filter || options.minFilter || gl.LINEAR;
  if (this.type === gl.FLOAT) {
    if (!Texture.canUseFloatingPointTextures()) {
      throw new Error('OES_texture_float is required but not supported');
    }
    if ((minFilter !== gl.NEAREST || magFilter !== gl.NEAREST) &&
        !Texture.canUseFloatingPointLinearFiltering()) {
      throw new Error('OES_texture_float_linear is required but not supported');
    }
  } else if (this.type === gl.HALF_FLOAT_OES) {
    if (!Texture.canUseHalfFloatingPointTextures()) {
      throw new Error('OES_texture_half_float is required but not supported');
    }
    if ((minFilter !== gl.NEAREST || magFilter !== gl.NEAREST) &&
        !Texture.canUseHalfFloatingPointLinearFiltering()) {
      throw new Error('OES_texture_half_float_linear is required but not supported');
    }
  }
  gl.bindTexture(gl.TEXTURE_2D, this.id);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, magFilter);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, minFilter);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, options.wrap || options.wrapS || gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, options.wrap || options.wrapT || gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D, 0, this.format, width, height, 0, this.format, this.type, null);
}