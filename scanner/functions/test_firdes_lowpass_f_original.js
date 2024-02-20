function test_firdes_lowpass_f_original() {
    //Original method explained over here: 
    //http://kapadia.github.io/emscripten/2013/09/13/emscripten-pointers-and-pointers.html
    _sdrjs_logb("test_firdes_lowpass_f_original():");
    _sdrjs_logb("Now designing FIR filter with firdes_lowpass_f in sdr.js...");
    _sdrjs_logb("output should be the same as: <strong>csdr firdes_lowpass_f 0.1 101 HAMMING</strong>");

    var outputSize = 101 * 4;
    var outputPtr = Module._malloc(outputSize);
    var outputHeap = new Uint8Array(Module.HEAPU8.buffer, outputPtr, outputSize);
    firdes_lowpass_f(outputHeap.byteOffset, 101, 0.1, 2);
    var output = new Float32Array(outputHeap.buffer, outputHeap.byteOffset, 101);
    outputStr = String();
    for (i = 0; i < output.length; i++) outputStr += output[i].toFixed(6) + ", ";
    Module._free(outputHeap.byteOffset);
    _sdrjs_logb(outputStr);
}