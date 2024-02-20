function getFloat32(size) {
  try {
    return new Float32Array(size);
  }
  catch (error) {
    return new Array(size);
  }
}