function _tryWriteAndPassFloatingPointWithByteReadTexture() {
    let textureFloat = new WglTexture(1, 1, WebGLRenderingContext.FLOAT);
    let textureByte = new WglTexture(1, 1, WebGLRenderingContext.UNSIGNED_BYTE);
    let shader = new WglShader(`void main() { gl_FragColor = vec4(1.1, 3.0, 5.0, -7654321.0); }`);
    let passer = new WglShader(`uniform sampler2D t; void main() {
        vec4 v = texture2D(t, gl_FragCoord.xy);
        if (v == vec4(2.0, 3.0, 5.0, -7654321.0)) { // Testing that expected precision is present.
            gl_FragColor = vec4(2.0, 3.0, 5.0, 254.0) / 255.0;
        } else {
            gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
        }
    }`);
    try {
        shader.withArgs().renderTo(textureFloat);
        passer.withArgs(WglArg.texture('t', textureFloat)).renderTo(textureByte);
        let result = textureByte.readPixels(false);
        return result instanceof Uint8Array &&
            result.length === 4 &&
            result[0] === 2 &&
            result[1] === 3 &&
            result[2] === 5 &&
            result[3] === 254;
    } catch (ex) {
        console.warn(ex);
        return false;
    } finally {
        textureFloat.ensureDeinitialized();
        textureByte.ensureDeinitialized();
        shader.ensureDeinitialized();
        passer.ensureDeinitialized();
    }
}