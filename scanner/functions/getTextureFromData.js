function getTextureFromData(gl, data) {
  if (data instanceof Texture2D) {
    return data;
  }
  return new Texture2D(gl, {
    data,
    parameters: {
      [gl.TEXTURE_MIN_FILTER]: gl.LINEAR_MIPMAP_LINEAR,
      // GL.LINEAR is the default value but explicitly set it here
      [gl.TEXTURE_MAG_FILTER]: gl.LINEAR,
      [gl.TEXTURE_WRAP_S]: gl.CLAMP_TO_EDGE,
      [gl.TEXTURE_WRAP_T]: gl.CLAMP_TO_EDGE
    }
  });
}