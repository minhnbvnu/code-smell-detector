function wrapGLError(gl) {
    var f = gl.getError;
    gl.getError = function() {
        var err;
        do {
            err = f.apply(gl);
            if (err != gl.NO_ERROR) {
                glErrorShadow[err] = true;
            }
        } while (err != gl.NO_ERROR);
        for (var err in glErrorShadow) {
            if (glErrorShadow[err]) {
                delete glErrorShadow[err];
                return parseInt(err);
            }
        }
        return gl.NO_ERROR;
    };
}