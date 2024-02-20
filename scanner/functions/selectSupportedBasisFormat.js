function selectSupportedBasisFormat() {
    const supportedFormats = getSupportedGPUTextureFormats();
    if (supportedFormats.has("astc")) {
      return "astc-4x4";
    } else if (supportedFormats.has("dxt")) {
      return {
        alpha: "bc3",
        noAlpha: "bc1"
      };
    } else if (supportedFormats.has("pvrtc")) {
      return {
        alpha: "pvrtc1-4-rgba",
        noAlpha: "pvrtc1-4-rgb"
      };
    } else if (supportedFormats.has("etc1")) {
      return "etc1";
    } else if (supportedFormats.has("etc2")) {
      return "etc2";
    }
    return "rgb565";
  }