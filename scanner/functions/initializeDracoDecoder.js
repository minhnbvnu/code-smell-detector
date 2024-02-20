function initializeDracoDecoder(DracoDecoderModule, wasmBinary) {
    const options = {};
    if (wasmBinary) {
      options.wasmBinary = wasmBinary;
    }
    return new Promise((resolve) => {
      DracoDecoderModule({
        ...options,
        onModuleLoaded: (draco) => resolve({ draco })
      });
    });
  }