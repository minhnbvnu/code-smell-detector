function makeByteCoderInput(vecSize, name) {
    let type = ['float', 'vec2', 'vec3', 'vec4'][vecSize - 1];
    let pre = `_gen_${name}`;
    return new ShaderPart(`
        ///////////// makeByteCoderInput(${vecSize}, ${name}) ////////////
        uniform sampler2D ${pre}_tex;
        uniform vec2 ${pre}_size;

        ${type} read_${name}(float k) {
            k *= ${vecSize}.0;
            vec2 uv = vec2(mod(k, ${pre}_size.x) + 0.5,
                           floor(k / ${pre}_size.x) + 0.5) / ${pre}_size;

            ${Seq.range(vecSize).map(i => `
                vec2 uv${i} = uv + vec2(${i}.0 / ${pre}_size.x, 0.0);
                vec4 bytes${i} = texture2D(${pre}_tex, uv${i});`).join('')}

            return ${type}(${Seq.range(vecSize).map(i => `
                _gen_unpackBytesIntoFloat(bytes${i})`).join(',')});
        }

        float len_${name}() {
            return ${pre}_size.x * ${pre}_size.y / ${vecSize}.0;
        }`,
        [UNPACK_BYTES_INTO_FLOAT_CODE],
        texture => {
            if (texture.pixelType !== WebGLRenderingContext.UNSIGNED_BYTE) {
                throw new DetailedError("vec2Input_Byte requires byte texture", {name, texture});
            }
            return [
                WglArg.texture(`${pre}_tex`, texture),
                WglArg.vec2(`${pre}_size`, texture.width, texture.height)
            ];
        });
}