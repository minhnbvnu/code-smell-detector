function VignetteEffect(graphicsDevice) {
    pc.PostEffect.call(this, graphicsDevice);

    // Shaders
    var luminosityFrag = [
        "uniform sampler2D uColorBuffer;",
        "uniform float uDarkness;",
        "uniform float uOffset;",
        "",
        "varying vec2 vUv0;",
        "",
        "void main() {",
        "    vec4 texel = texture2D(uColorBuffer, vUv0);",
        "    vec2 uv = (vUv0 - vec2(0.5)) * vec2(uOffset);",
        "    gl_FragColor = vec4(mix(texel.rgb, vec3(1.0 - uDarkness), dot(uv, uv)), texel.a);",
        "}"
    ].join("\n");

    this.vignetteShader = pc.createShaderFromCode(graphicsDevice, pc.PostEffect.quadVertexShader, luminosityFrag, 'VignetteShader', {
        aPosition: pc.SEMANTIC_POSITION
    });

    this.offset = 1;
    this.darkness = 1;
}