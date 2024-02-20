async function parseBasis(data, options) {
    if (options.basis.containerFormat === "auto") {
      if (isKTX(data)) {
        const fileConstructors = await loadBasisEncoderModule(options);
        return parseKTX2File(fileConstructors.KTX2File, data, options);
      }
      const { BasisFile } = await loadBasisTrascoderModule(options);
      return parseBasisFile(BasisFile, data, options);
    }
    switch (options.basis.module) {
      case "encoder":
        const fileConstructors = await loadBasisEncoderModule(options);
        switch (options.basis.containerFormat) {
          case "ktx2":
            return parseKTX2File(fileConstructors.KTX2File, data, options);
          case "basis":
          default:
            return parseBasisFile(fileConstructors.BasisFile, data, options);
        }
      case "transcoder":
      default:
        const { BasisFile } = await loadBasisTrascoderModule(options);
        return parseBasisFile(BasisFile, data, options);
    }
  }