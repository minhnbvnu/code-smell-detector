function canTestFloatShaders() {
    if (_floatShadersWorkWell === undefined) {
        _floatShadersWorkWell = _tryWriteAndReadFloatingPointTexture();
    }
    return _floatShadersWorkWell
}