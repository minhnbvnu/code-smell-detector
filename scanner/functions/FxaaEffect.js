function FxaaEffect(graphicsDevice) {
    pc.PostEffect.call(this, graphicsDevice);

    // Shaders
    // TODO: this shader does not use UV coordinates from vertex shader, and might render upside down on WebGPU. Needs to be fixed.
    var fxaaFrag = [
        "uniform sampler2D uColorBuffer;",
        "uniform vec2 uResolution;",
        "",
        "#define FXAA_REDUCE_MIN   (1.0/128.0)",
        "#define FXAA_REDUCE_MUL   (1.0/8.0)",
        "#define FXAA_SPAN_MAX     8.0",
        "",
        "void main()",
        "{",
        "    vec3 rgbNW = texture2D( uColorBuffer, ( gl_FragCoord.xy + vec2( -1.0, -1.0 ) ) * uResolution ).xyz;",
        "    vec3 rgbNE = texture2D( uColorBuffer, ( gl_FragCoord.xy + vec2( 1.0, -1.0 ) ) * uResolution ).xyz;",
        "    vec3 rgbSW = texture2D( uColorBuffer, ( gl_FragCoord.xy + vec2( -1.0, 1.0 ) ) * uResolution ).xyz;",
        "    vec3 rgbSE = texture2D( uColorBuffer, ( gl_FragCoord.xy + vec2( 1.0, 1.0 ) ) * uResolution ).xyz;",
        "    vec4 rgbaM  = texture2D( uColorBuffer,  gl_FragCoord.xy  * uResolution );",
        "    vec3 rgbM  = rgbaM.xyz;",
        "    float opacity  = rgbaM.w;",
        "",
        "    vec3 luma = vec3( 0.299, 0.587, 0.114 );",
        "",
        "    float lumaNW = dot( rgbNW, luma );",
        "    float lumaNE = dot( rgbNE, luma );",
        "    float lumaSW = dot( rgbSW, luma );",
        "    float lumaSE = dot( rgbSE, luma );",
        "    float lumaM  = dot( rgbM,  luma );",
        "    float lumaMin = min( lumaM, min( min( lumaNW, lumaNE ), min( lumaSW, lumaSE ) ) );",
        "    float lumaMax = max( lumaM, max( max( lumaNW, lumaNE) , max( lumaSW, lumaSE ) ) );",
        "",
        "    vec2 dir;",
        "    dir.x = -((lumaNW + lumaNE) - (lumaSW + lumaSE));",
        "    dir.y =  ((lumaNW + lumaSW) - (lumaNE + lumaSE));",
        "",
        "    float dirReduce = max( ( lumaNW + lumaNE + lumaSW + lumaSE ) * ( 0.25 * FXAA_REDUCE_MUL ), FXAA_REDUCE_MIN );",
        "",
        "    float rcpDirMin = 1.0 / ( min( abs( dir.x ), abs( dir.y ) ) + dirReduce );",
        "    dir = min( vec2( FXAA_SPAN_MAX, FXAA_SPAN_MAX), max( vec2(-FXAA_SPAN_MAX, -FXAA_SPAN_MAX), dir * rcpDirMin)) * uResolution;",
        "",
        "    vec3 rgbA = 0.5 * (",
        "        texture2D( uColorBuffer, gl_FragCoord.xy  * uResolution + dir * ( 1.0 / 3.0 - 0.5 ) ).xyz +",
        "        texture2D( uColorBuffer, gl_FragCoord.xy  * uResolution + dir * ( 2.0 / 3.0 - 0.5 ) ).xyz );",
        "",
        "    vec3 rgbB = rgbA * 0.5 + 0.25 * (",
        "        texture2D( uColorBuffer, gl_FragCoord.xy  * uResolution + dir * -0.5 ).xyz +",
        "        texture2D( uColorBuffer, gl_FragCoord.xy  * uResolution + dir * 0.5 ).xyz );",
        "",
        "    float lumaB = dot( rgbB, luma );",
        "",
        "    if ( ( lumaB < lumaMin ) || ( lumaB > lumaMax ) )",
        "    {",
        "        gl_FragColor = vec4( rgbA, opacity );",
        "    }",
        "    else",
        "    {",
        "        gl_FragColor = vec4( rgbB, opacity );",
        "    }",
        "}"
    ].join("\n");

    this.fxaaShader = pc.createShaderFromCode(graphicsDevice, pc.PostEffect.quadVertexShader, fxaaFrag, 'FxaaShader', {
        aPosition: pc.SEMANTIC_POSITION
    });

    // Uniforms
    this.resolution = new Float32Array(2);
}