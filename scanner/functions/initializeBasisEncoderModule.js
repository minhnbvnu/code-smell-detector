function initializeBasisEncoderModule(BasisEncoderModule, wasmBinary) {
    const options = {};
    if (wasmBinary) {
      options.wasmBinary = wasmBinary;
    }
    return new Promise((resolve) => {
      BasisEncoderModule(options).then((module2) => {
        const { BasisFile, KTX2File, initializeBasis, BasisEncoder } = module2;
        initializeBasis();
        resolve({ BasisFile, KTX2File, BasisEncoder });
      });
    });
  }