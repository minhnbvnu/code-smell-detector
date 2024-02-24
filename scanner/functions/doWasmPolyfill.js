function doWasmPolyfill(global,env,providedBuffer,method){if(typeof WasmJS!=="function"){Module["printErr"]("WasmJS not detected - polyfill not bundled?");return false}var wasmJS=WasmJS({});wasmJS["outside"]=Module;wasmJS["info"]=info;wasmJS["lookupImport"]=lookupImport;assert(providedBuffer===Module["buffer"]);info.global=global;info.env=env;assert(providedBuffer===Module["buffer"]);env["memory"]=providedBuffer;assert(env["memory"]instanceof ArrayBuffer);wasmJS["providedTotalMemory"]=Module["buffer"].byteLength;var code;if(method==="interpret-binary"){code=getBinary()}else{code=Module["read"](method=="interpret-asm2wasm"?asmjsCodeFile:wasmTextFile)}var temp;if(method=="interpret-asm2wasm"){temp=wasmJS["_malloc"](code.length+1);wasmJS["writeAsciiToMemory"](code,temp);wasmJS["_load_asm2wasm"](temp)}else if(method==="interpret-s-expr"){temp=wasmJS["_malloc"](code.length+1);wasmJS["writeAsciiToMemory"](code,temp);wasmJS["_load_s_expr2wasm"](temp)}else if(method==="interpret-binary"){temp=wasmJS["_malloc"](code.length);wasmJS["HEAPU8"].set(code,temp);wasmJS["_load_binary2wasm"](temp,code.length)}else{throw"what? "+method}wasmJS["_free"](temp);wasmJS["_instantiate"](temp);if(Module["newBuffer"]){mergeMemory(Module["newBuffer"]);Module["newBuffer"]=null}exports=wasmJS["asmExports"];return exports}