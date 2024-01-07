function HorizontalTiltShiftEffect(graphicsDevice) {
    pc.PostEffect.call(this, graphicsDevice);

    // Shader author: alteredq / http://alteredqualia.com/
    var fshader = [
        "uniform sampler2D uColorBuffer;",
        "uniform float uH;",
        "uniform float uR;",
        "",
        "varying vec2 vUv0;",
        "",
        "void main() {",
        "    vec4 sum = vec4( 0.0 );",
        "    float hh = uH * abs( uR - vUv0.x );",
        "",
        "    sum += texture2D( uColorBuffer, vec2( vUv0.x - 4.0 * hh, vUv0.y ) ) * 0.051;",
        "    sum += texture2D( uColorBuffer, vec2( vUv0.x - 3.0 * hh, vUv0.y ) ) * 0.0918;",
        "    sum += texture2D( uColorBuffer, vec2( vUv0.x - 2.0 * hh, vUv0.y ) ) * 0.12245;",
        "    sum += texture2D( uColorBuffer, vec2( vUv0.x - 1.0 * hh, vUv0.y ) ) * 0.1531;",
        "    sum += texture2D( uColorBuffer, vec2( vUv0.x, vUv0.y ) ) * 0.1633;",
        "    sum += texture2D( uColorBuffer, vec2( vUv0.x + 1.0 * hh, vUv0.y ) ) * 0.1531;",
        "    sum += texture2D( uColorBuffer, vec2( vUv0.x + 2.0 * hh, vUv0.y ) ) * 0.12245;",
        "    sum += texture2D( uColorBuffer, vec2( vUv0.x + 3.0 * hh, vUv0.y ) ) * 0.0918;",
        "    sum += texture2D( uColorBuffer, vec2( vUv0.x + 4.0 * hh, vUv0.y ) ) * 0.051;",
        "",
        "    gl_FragColor = sum;",
        "}"
    ].join("\n");

    this.shader = pc.createShaderFromCode(graphicsDevice, pc.PostEffect.quadVertexShader, fshader, 'HorizontalTiltShiftShader', {
        aPosition: pc.SEMANTIC_POSITION
    });

    // uniforms
    this.focus = 0.35;
}