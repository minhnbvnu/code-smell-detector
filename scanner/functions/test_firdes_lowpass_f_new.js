function test_firdes_lowpass_f_new() {
    //This is much simpler, using asm$
    _sdrjs_logb("test_firdes_lowpass_f_new():");
    _sdrjs_logb("Now designing FIR filter with firdes_lowpass_f in sdr.js...");
    _sdrjs_logb("output should be the same as: <strong>csdr firdes_lowpass_f 0.1 101 HAMMING</strong>");

    output = asm$.malloc(Float32Array, 101);
    firdes_lowpass_f(output.ptr, 101, 0.1, 2);
    outputStr = String();
    for (i = 0; i < output.arr.length; i++) outputStr += (output.arr[i]).toFixed(6) + ", ";
    output.free();
    _sdrjs_logb(outputStr);
}