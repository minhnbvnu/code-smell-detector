async function meshoptDecodeGltfBuffer(target, count, size, source, mode, filter = "NONE") {
    const instance = await loadWasmInstance();
    decode(instance, instance.exports[DECODERS[mode]], target, count, size, source, instance.exports[FILTERS[filter || "NONE"]]);
  }