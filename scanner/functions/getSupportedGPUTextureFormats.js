function getSupportedGPUTextureFormats(gl) {
    if (!formats) {
      gl = gl || getWebGLContext() || void 0;
      formats = new Set();
      for (const prefix of BROWSER_PREFIXES) {
        for (const extension in WEBGL_EXTENSIONS) {
          if (gl && gl.getExtension(`${prefix}${extension}`)) {
            const gpuTextureFormat = WEBGL_EXTENSIONS[extension];
            formats.add(gpuTextureFormat);
          }
        }
      }
    }
    return formats;
  }