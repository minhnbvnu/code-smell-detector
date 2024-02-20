function checkGetErrorResult(gl, previousOperationDescription, isOnHotPath = false) {
    if (isOnHotPath && !Config.CHECK_WEB_GL_ERRORS_EVEN_ON_HOT_PATHS) {
        return;
    }

    let code = gl.getError();
    const GL = WebGLRenderingContext;
    if (code === GL.NO_ERROR) {
        return;
    }
    const msgs = {
        [0x0500]: "INVALID_ENUM [+constant not found]",
        [0x0501]: "INVALID_VALUE [+constant not found]",
        [0x0502]: "INVALID_OPERATION [+constant not found]",
        // 0x503 and 0x504 are GL_STACK_OVERFLOW and GL_STACK_UNDERFLOW but not present in webgl.
        [0x0505]: "OUT_OF_MEMORY [+constant not found]",
        [0x0506]: "INVALID_FRAMEBUFFER_OPERATION [+constant not found]",
        [0x9242]: "CONTEXT_LOST_WEBGL [+constant not found]",

        [GL.INVALID_ENUM]: "INVALID_ENUM",
        [GL.INVALID_VALUE]: "INVALID_VALUE",
        [GL.INVALID_OPERATION]: "INVALID_OPERATION",
        [GL.OUT_OF_MEMORY]: "OUT_OF_MEMORY",
        [GL.INVALID_FRAMEBUFFER_OPERATION]: "INVALID_FRAMEBUFFER_OPERATION",
        [GL.CONTEXT_LOST_WEBGL]: "CONTEXT_LOST_WEBGL"
    };
    let d = msgs[code] !== undefined ? msgs[code] : "?";
    throw new Error(`gl.getError() returned 0x${code.toString(16)} (${d}) after ${previousOperationDescription}.`);
}