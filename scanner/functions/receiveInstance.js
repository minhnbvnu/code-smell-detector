function receiveInstance(instance,module){var exports=instance.exports;Module["asm"]=exports;wasmMemory=Module["asm"]["o"];updateGlobalBufferAndViews(wasmMemory.buffer);wasmTable=Module["asm"]["s"];addOnInit(Module["asm"]["p"]);removeRunDependency("wasm-instantiate")}