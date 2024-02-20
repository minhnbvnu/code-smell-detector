async function loadBasisTrascoder(options) {
    let BASIS = null;
    let wasmBinary = null;
    [BASIS, wasmBinary] = await Promise.all([
      await loadLibrary("basis_transcoder.js", "textures", options),
      await loadLibrary("basis_transcoder.wasm", "textures", options)
    ]);
    BASIS = BASIS || globalThis.BASIS;
    return await initializeBasisTrascoderModule(BASIS, wasmBinary);
  }