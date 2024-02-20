function tapsToFuncSource(taps) {
    switch (taps) {
        case 5:
            return glslfunctions_1.glslFuncs.gauss5;
        case 9:
            return glslfunctions_1.glslFuncs.gauss9;
        case 13:
            return glslfunctions_1.glslFuncs.gauss13;
    }
}