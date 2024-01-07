function HueSaturationEffect(graphicsDevice) {
    pc.PostEffect.call(this, graphicsDevice);

    // Shader author: tapio / http://tapio.github.com/
    var fshader = [
        "uniform sampler2D uColorBuffer;",
        "uniform float uHue;",
        "uniform float uSaturation;",
        "",
        "varying vec2 vUv0;",
        "",
        "void main() {",
        "    gl_FragColor = texture2D( uColorBuffer, vUv0 );",
        "",
        // uHue
        "    float angle = uHue * 3.14159265;",
        "    float s = sin(angle), c = cos(angle);",
        "    vec3 weights = (vec3(2.0 * c, -sqrt(3.0) * s - c, sqrt(3.0) * s - c) + 1.0) / 3.0;",
        "    float len = length(gl_FragColor.rgb);",
        "    gl_FragColor.rgb = vec3(",
        "        dot(gl_FragColor.rgb, weights.xyz),",
        "        dot(gl_FragColor.rgb, weights.zxy),",
        "        dot(gl_FragColor.rgb, weights.yzx)",
        "    );",
        "",
        // uSaturation
        "    float average = (gl_FragColor.r + gl_FragColor.g + gl_FragColor.b) / 3.0;",
        "    if (uSaturation > 0.0) {",
        "        gl_FragColor.rgb += (average - gl_FragColor.rgb) * (1.0 - 1.0 / (1.001 - uSaturation));",
        "    } else {",
        "        gl_FragColor.rgb += (average - gl_FragColor.rgb) * (-uSaturation);",
        "    }",
        "}"
    ].join("\n");

    this.shader = pc.createShaderFromCode(graphicsDevice, pc.PostEffect.quadVertexShader, fshader, 'HueSaturationShader', {
        aPosition: pc.SEMANTIC_POSITION
    });

    // uniforms
    this.hue = 0;
    this.saturation = 0;
}