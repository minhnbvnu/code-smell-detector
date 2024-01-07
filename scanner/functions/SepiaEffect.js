function SepiaEffect(graphicsDevice) {
    pc.PostEffect.call(this, graphicsDevice);

    var fshader = [
        "uniform float uAmount;",
        "uniform sampler2D uColorBuffer;",
        "",
        "varying vec2 vUv0;",
        "",
        "void main() {",
        "    vec4 color = texture2D(uColorBuffer, vUv0);",
        "    vec3 c = color.rgb;",
        "",
        "    color.r = dot(c, vec3(1.0 - 0.607 * uAmount, 0.769 * uAmount, 0.189 * uAmount));",
        "    color.g = dot(c, vec3(0.349 * uAmount, 1.0 - 0.314 * uAmount, 0.168 * uAmount));",
        "    color.b = dot(c, vec3(0.272 * uAmount, 0.534 * uAmount, 1.0 - 0.869 * uAmount));",
        "",
        "    gl_FragColor = vec4(min(vec3(1.0), color.rgb), color.a);",
        "}"
    ].join("\n");

    this.shader = pc.createShaderFromCode(graphicsDevice, pc.PostEffect.quadVertexShader, fshader, 'SepiaShader', {
        aPosition: pc.SEMANTIC_POSITION
    });

    // Uniforms
    this.amount = 1;
}