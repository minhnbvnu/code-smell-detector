function _chooseShaderCoders() {
    if (_tryWriteAndReadFloatingPointTexture()) {
        // Floats work. Hurray!
        _curShaderCoder = SHADER_CODER_FLOATS;
        _outShaderCoder = SHADER_CODER_FLOATS;
    } else if (_tryWriteAndPassFloatingPointWithByteReadTexture()) {
        console.warn("Wrote but failed to read a floating point texture. Falling back to float-as-byte output coding.");
        _curShaderCoder = SHADER_CODER_FLOATS;
        _outShaderCoder = SHADER_CODER_BYTES;
    } else {
        console.warn("Failed to write a floating point texture. Falling back to float-as-byte coding everywhere.");
        _curShaderCoder = SHADER_CODER_BYTES;
        _outShaderCoder = SHADER_CODER_BYTES;
    }
}