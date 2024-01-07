function synthesizeGLError(err, opt_msg) {
    glErrorShadow[err] = true;
    if (opt_msg !== undefined) {
        error(opt_msg)
    }
}