async function loadWasmModule() {
    let wasm = wasm_base;
    if (WebAssembly.validate(detector)) {
      wasm = wasm_simd;
      console.log("Warning: meshopt_decoder is using experimental SIMD support");
    }
    const result = await WebAssembly.instantiate(unpack(wasm), {});
    await result.instance.exports.__wasm_call_ctors();
    return result.instance;
  }