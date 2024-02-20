async function loadWasmInstance() {
    if (!wasmPromise) {
      wasmPromise = loadWasmModule();
    }
    return wasmPromise;
  }