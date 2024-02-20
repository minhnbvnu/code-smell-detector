function _WebGLShader(renderer, type, string) {
    const gl = renderer.getContext();
    const shader = gl.createShader(type);

    gl.shaderSource(shader, string);
    gl.compileShader(shader);
    return shader;
}