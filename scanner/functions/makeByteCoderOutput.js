function makeByteCoderOutput(vecSize) {
    let type = ['float', 'vec2', 'vec3', 'vec4'][vecSize - 1];
    return new ShaderPart(`
        ///////////// makeByteCoderOutput${vecSize} ////////////
        ${type} outputFor(float k);

        uniform vec2 _gen_output_size;
        uniform float _gen_secret_half;

        float len_output() {
            return _gen_output_size.x * _gen_output_size.y / ${vecSize}.0;
        }

        void main() {
            vec2 xy = gl_FragCoord.xy - vec2(_gen_secret_half, _gen_secret_half);
            float k = xy.y * _gen_output_size.x + xy.x;
            float r = mod(k, ${vecSize}.0);
            ${vecSize === 1 ?
                'float component = outputFor(k);' :
                `${type} result = outputFor(floor(k / ${vecSize}.0));
                 ${type} picker = ${type}(${Seq.range(vecSize).map(r => `float(r == ${r}.0)`).join(", ")});
                 float component = dot(result, picker);`
            }
            gl_FragColor = _gen_packFloatIntoBytes(component);
        }`,
        [PACK_FLOAT_INTO_BYTES_CODE],
        texture => [
            WglArg.vec2('_gen_output_size', texture.width, texture.height),
            WglArg.float('_gen_secret_half', 0.5)
        ]);
}