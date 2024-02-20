function sendTexture(gl, src) {
    // if you are using textures instead of images, the user is responsible for
    // updating that texture, so just return
    if (src instanceof WebGLTexture || src === null)
        return;
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, src);
}