function makeFloatCoderInput(vecSize, name) {
    let type = ['float', 'vec2', 'vec3', 'vec4'][vecSize - 1];
    let pre = `_gen_${name}`;
    return new ShaderPart(`
        ///////////// makeFloatCoderInput(${vecSize}, ${name}) ////////////
        uniform sampler2D ${pre}_tex;
        uniform vec2 ${pre}_size;

        ${type} read_${name}(float k) {
            vec2 uv = vec2(mod(k, ${pre}_size.x) + 0.5,
                           floor(k / ${pre}_size.x) + 0.5) / ${pre}_size;
            return texture2D(${pre}_tex, uv).${'xyzw'.substring(0, vecSize)};
        }

        float len_${name}() {
            return ${pre}_size.x * ${pre}_size.y;
        }`,
        [],
        texture => {
            if (texture.pixelType !== WebGLRenderingContext.FLOAT) {
                throw new DetailedError(`vecInput${vecSize}_Float requires float texture`, {name, texture});
            }
            return [
                WglArg.texture(`${pre}_tex`, texture),
                WglArg.vec2(`${pre}_size`, texture.width, texture.height)
            ];
        });
}