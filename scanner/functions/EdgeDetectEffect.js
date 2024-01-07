function EdgeDetectEffect(graphicsDevice) {
    pc.PostEffect.call(this, graphicsDevice);

    var fshader = [
        "uniform sampler2D uColorBuffer;",
        "varying vec2 vUv0;",
        "uniform vec2 uResolution;",
        "uniform float uIntensity;",
        "uniform vec4 uColor;",
        "",
        "mat3 G[2];",
        "",
        "const mat3 g0 = mat3( 1.0, 2.0, 1.0, 0.0, 0.0, 0.0, -1.0, -2.0, -1.0 );",
        "const mat3 g1 = mat3( 1.0, 0.0, -1.0, 2.0, 0.0, -2.0, 1.0, 0.0, -1.0 );",
        "",
        "void main(void)",
        "{",
        "    mat3 I;",
        "    float cnv[2];",
        "    vec3 sample;",
        "",
        "    G[0] = g0;",
        "    G[1] = g1;",
        "",
                /* Fetch the 3x3 neighbourhood and use the RGB vector's length as intensity value */
        "    for (float i = 0.0; i < 3.0; i++)",
        "    {",
        "        for (float j = 0.0; j < 3.0; j++)",
        "        {",
        "            sample = texture2D(uColorBuffer, vUv0 + uResolution * vec2(i - 1.0, j - 1.0)).rgb;",
        "            I[int(i)][int(j)] = length(sample);",
        "         }",
        "    }",
        "",
                /* Calculate the convolution values for all the masks */
        "    for (int i=0; i<2; i++)",
        "    {",
        "        float dp3 = dot(G[i][0], I[0]) + dot(G[i][1], I[1]) + dot(G[i][2], I[2]);",
        "        cnv[i] = dp3 * dp3; ",
        "    }",
        "",
        "    gl_FragColor = uIntensity * uColor * vec4(sqrt(cnv[0]*cnv[0]+cnv[1]*cnv[1]));",
        "}"
    ].join("\n");

    this.shader = pc.createShaderFromCode(graphicsDevice, pc.PostEffect.quadVertexShader, fshader, 'EdgeDetectShader', {
        aPosition: pc.SEMANTIC_POSITION
    });

    // Uniforms
    this.resolution = new Float32Array(2);
    this.intensity = 1.0;
    this.color = new pc.Color(1, 1, 1, 1);
}