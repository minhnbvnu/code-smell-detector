function OutlineEffect(graphicsDevice, thickness) {
    pc.PostEffect.call(this, graphicsDevice);

    var fshader = [
        "#define THICKNESS " + (thickness ? thickness.toFixed(0) : 1),
        "uniform float uWidth;",
        "uniform float uHeight;",
        "uniform vec4 uOutlineCol;",
        "uniform sampler2D uColorBuffer;",
        "uniform sampler2D uOutlineTex;",
        "",
        "varying vec2 vUv0;",
        "",
        "void main(void)",
        "{",
        "    vec4 texel1 = texture2D(uColorBuffer, vUv0);",
        "    float sample0 = texture2D(uOutlineTex, vUv0).a;",
        "    float outline = 0.0;",
        "    if (sample0==0.0)",
        "    {",
        "        for (int x=-THICKNESS;x<=THICKNESS;x++)",
        "        {",
        "            for (int y=-THICKNESS;y<=THICKNESS;y++)",
        "            {    ",
        "                float tex=texture2DLodEXT(uOutlineTex, vUv0 + vec2(float(x)/uWidth, float(y)/uHeight), 0.0).a;",
        "                if (tex>0.0)",
        "                {",
        "                    outline=1.0;",
        "                }",
        "            }",
        "        } ",
        "    }",
        "    gl_FragColor = mix(texel1, uOutlineCol, outline * uOutlineCol.a);",
        "}"
    ].join("\n");

    this.shader = pc.createShaderFromCode(graphicsDevice, pc.PostEffect.quadVertexShader, fshader, 'OutlineShader', {
        aPosition: pc.SEMANTIC_POSITION
    });

    // Uniforms
    this.color = new pc.Color(1, 1, 1, 1);
    this.texture = new pc.Texture(graphicsDevice);
    this.texture.name = 'pe-outline';
    this._colorData = new Float32Array(4);
}