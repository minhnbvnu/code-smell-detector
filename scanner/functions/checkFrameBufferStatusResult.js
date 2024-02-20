function checkFrameBufferStatusResult(gl, isOnHotPath = false) {
    if (isOnHotPath && !Config.CHECK_WEB_GL_ERRORS_EVEN_ON_HOT_PATHS) {
        return;
    }

    const GL = WebGLRenderingContext;
    let code = gl.checkFramebufferStatus(GL.FRAMEBUFFER);
    if (code === GL.FRAMEBUFFER_COMPLETE) {
        return;
    }
    const msgs = {
        [0]: "Argument wasn't a frame buffer",

        [0x0500]: "INVALID_ENUM [+constant not found]",
        [0x8CD6]: "FRAMEBUFFER_INCOMPLETE_ATTACHMENT [+constant not found]",
        [0x8CD7]: "FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT [+constant not found]",
        [0x8CD9]: "FRAMEBUFFER_INCOMPLETE_DIMENSIONS [+constant not found]",
        [0x8CDD]: "FRAMEBUFFER_UNSUPPORTED [+constant not found]",

        [GL.INVALID_ENUM]: "INVALID_ENUM",
        [GL.FRAMEBUFFER_INCOMPLETE_ATTACHMENT]: "FRAMEBUFFER_INCOMPLETE_ATTACHMENT",
        [GL.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT]: "FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT",
        [GL.FRAMEBUFFER_INCOMPLETE_DIMENSIONS]: "FRAMEBUFFER_INCOMPLETE_DIMENSIONS",
        [GL.FRAMEBUFFER_UNSUPPORTED]: "FRAMEBUFFER_UNSUPPORTED"
    };
    let d = msgs[code] !== undefined ? msgs[code] : "?";
    throw new Error(`gl.checkFramebufferStatus() returned 0x${code.toString(16)} (${d}).`);
}