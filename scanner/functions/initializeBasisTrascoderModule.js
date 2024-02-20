function initializeBasisTrascoderModule(BasisModule, wasmBinary) {
    const options = {};
    if (wasmBinary) {
      options.wasmBinary = wasmBinary;
    }
    return new Promise((resolve) => {
      BasisModule(options).then((module2) => {
        const { BasisFile, initializeBasis } = module2;
        initializeBasis();
        resolve({ BasisFile });
      });
    });
  }