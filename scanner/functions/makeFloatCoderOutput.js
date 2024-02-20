function makeFloatCoderOutput(vecSize) {
    let type = ['float', 'vec2', 'vec3', 'vec4'][vecSize - 1];
    let vIntoVec4 = [
        'vec4(v, 0.0, 0.0, 0.0)',
        'vec4(v.x, v.y, 0.0, 0.0)',
        'vec4(v.x, v.y, v.z, 0.0)',
        'v'
    ][vecSize - 1];
    return new ShaderPart(`
        ///////////// makeFloatCoderOutput${vecSize} ////////////
        ${type} outputFor(float k);

        uniform vec2 _gen_output_size;
        uniform float _gen_secret_half;

        float len_output() {
            return _gen_output_size.x * _gen_output_size.y;
        }

        void main() {
            vec2 xy = gl_FragCoord.xy - vec2(_gen_secret_half, _gen_secret_half);
            float k = xy.y * _gen_output_size.x + xy.x;

            ${type} v = outputFor(k);

            gl_FragColor = ${vIntoVec4};
        }`,
        [],
        texture => [
            WglArg.vec2('_gen_output_size', texture.width, texture.height),
            WglArg.float('_gen_secret_half', 0.5)
        ]);
}