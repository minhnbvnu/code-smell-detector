async function loadBasisTrascoderModule(options) {
    const modules = options.modules || {};
    if (modules.basis) {
      return modules.basis;
    }
    loadBasisTranscoderPromise = loadBasisTranscoderPromise || loadBasisTrascoder(options);
    return await loadBasisTranscoderPromise;
  }