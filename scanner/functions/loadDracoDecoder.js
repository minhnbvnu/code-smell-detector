async function loadDracoDecoder(options) {
    let DracoDecoderModule;
    let wasmBinary;
    switch (options.draco && options.draco.decoderType) {
      case "js":
        DracoDecoderModule = await loadLibrary(DRACO_JS_DECODER_URL, "draco", options);
        break;
      case "wasm":
      default:
        [DracoDecoderModule, wasmBinary] = await Promise.all([
          await loadLibrary(DRACO_WASM_WRAPPER_URL, "draco", options),
          await loadLibrary(DRACO_WASM_DECODER_URL, "draco", options)
        ]);
    }
    DracoDecoderModule = DracoDecoderModule || globalThis.DracoDecoderModule;
    return await initializeDracoDecoder(DracoDecoderModule, wasmBinary);
  }