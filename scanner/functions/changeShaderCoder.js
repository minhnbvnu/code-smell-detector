function changeShaderCoder(newCoder) {
    //noinspection UnusedCatchParameterJS,EmptyCatchBlockJS
    try {
        initializedWglContext().invalidateExistingResources();
    } catch (_) {
    }

    _curShaderCoder = newCoder;
    _outShaderCoder = newCoder;
}