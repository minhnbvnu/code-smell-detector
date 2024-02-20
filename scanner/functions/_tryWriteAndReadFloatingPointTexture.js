function _tryWriteAndReadFloatingPointTexture() {
    let texture = new WglTexture(1, 1, WebGLRenderingContext.FLOAT);
    let shader = new WglShader(`void main() { gl_FragColor = vec4(2.0, 3.5, 7.0, -7654321.0); }`);
    try {
        shader.withArgs().renderTo(texture);
        let result = texture.readPixels(false);
        return result instanceof Float32Array &&
            result.length === 4 &&
            result[0] === 2 &&
            result[1] === 3.5 &&
            result[2] === 7 &&
            result[3] === -7654321; // Testing that expected precision is present.
    } catch (ex) {
        console.warn(ex);
        return false;
    } finally {
        texture.ensureDeinitialized();
        shader.ensureDeinitialized()
    }
}