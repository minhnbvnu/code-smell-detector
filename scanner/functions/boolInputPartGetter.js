function boolInputPartGetter(name) {
    let pre = `_gen_${name}`;
    return new ShaderPart(`
        ///////////// boolInput(${name}) ////////////
        uniform sampler2D ${pre}_tex;
        uniform vec2 ${pre}_size;

        float read_${name}(float k) {
            vec2 uv = vec2(mod(k, ${pre}_size.x) + 0.5,
                           floor(k / ${pre}_size.x) + 0.5) / ${pre}_size;
            return float(texture2D(${pre}_tex, uv).x == 1.0);
        }

        float len_${name}() {
            return ${pre}_size.x * ${pre}_size.y * 4.0;
        }`,
        [],
        texture => [
            WglArg.texture(`${pre}_tex`, texture),
            WglArg.vec2(`${pre}_size`, texture.width, texture.height)
        ]);
}