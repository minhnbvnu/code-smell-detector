function BrightnessContrastEffect(graphicsDevice) {
    pc.PostEffect.call(this, graphicsDevice);

    // Shader author: tapio / http://tapio.github.com/
    var fshader = [
        "uniform sampler2D uColorBuffer;",
        "uniform float uBrightness;",
        "uniform float uContrast;",
        "",
        "varying vec2 vUv0;",
        "",
        "void main() {",
        "    gl_FragColor = texture2D( uColorBuffer, vUv0 );",
        "    gl_FragColor.rgb += uBrightness;",
        "",
        "    if (uContrast > 0.0) {",
        "        gl_FragColor.rgb = (gl_FragColor.rgb - 0.5) / (1.0 - uContrast) + 0.5;",
        "    } else {",
        "        gl_FragColor.rgb = (gl_FragColor.rgb - 0.5) * (1.0 + uContrast) + 0.5;",
        "    }",
        "}"
    ].join("\n");

    this.shader = pc.createShaderFromCode(graphicsDevice, pc.PostEffect.quadVertexShader, fshader, 'BrightnessContrastShader', {
        aPosition: pc.SEMANTIC_POSITION
    });

    // Uniforms
    this.brightness = 0;
    this.contrast = 0;
}