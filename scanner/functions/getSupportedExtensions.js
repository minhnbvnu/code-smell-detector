function getSupportedExtensions() {
  if (!supportedExtensions) {
    const canvas = document.createElement('canvas');
    const gl = getContext(canvas);
    if (gl) {
      supportedExtensions = gl.getSupportedExtensions();
    }
  }
  return supportedExtensions;
}