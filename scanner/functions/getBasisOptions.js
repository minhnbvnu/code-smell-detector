function getBasisOptions(options, hasAlpha) {
    let format = options && options.basis && options.basis.format;
    if (format === "auto") {
      format = selectSupportedBasisFormat();
    }
    if (typeof format === "object") {
      format = hasAlpha ? format.alpha : format.noAlpha;
    }
    format = format.toLowerCase();
    return OutputFormat[format];
  }