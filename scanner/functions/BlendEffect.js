function BlendEffect(graphicsDevice) {
    pc.PostEffect.call(this, graphicsDevice);

    var fshader = [
        "uniform float uMixRatio;",
        "uniform sampler2D uColorBuffer;",
        "uniform sampler2D uBlendMap;",
        "",
        "varying vec2 vUv0;",
        "",
        "void main(void)",
        "{",
        "    vec4 texel1 = texture2D(uColorBuffer, vUv0);",
        "    vec4 texel2 = texture2D(uBlendMap, vUv0);",
        "    gl_FragColor = mix(texel1, texel2, uMixRatio);",
        "}"
    ].join("\n");

    this.shader = pc.createShaderFromCode(graphicsDevice, pc.PostEffect.quadVertexShader, fshader, 'BlendShader', {
        aPosition: pc.SEMANTIC_POSITION
    });

    // Uniforms
    this.mixRatio = 0.5;
    this.blendMap = new pc.Texture(graphicsDevice);
    this.blendMap.name = 'pe-blend';
}