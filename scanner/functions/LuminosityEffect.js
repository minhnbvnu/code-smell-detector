function LuminosityEffect(graphicsDevice) {
    pc.PostEffect.call(this, graphicsDevice);

    var fshader = [
        "uniform sampler2D uColorBuffer;",
        "",
        "varying vec2 vUv0;",
        "",
        "void main() {",
        "    vec4 texel = texture2D(uColorBuffer, vUv0);",
        "    vec3 luma = vec3(0.299, 0.587, 0.114);",
        "    float v = dot(texel.xyz, luma);",
        "    gl_FragColor = vec4(v, v, v, texel.w);",
        "}"
    ].join("\n");

    this.shader = pc.createShaderFromCode(graphicsDevice, pc.PostEffect.quadVertexShader, fshader, 'LuminosityShader', {
        aPosition: pc.SEMANTIC_POSITION
    });
}