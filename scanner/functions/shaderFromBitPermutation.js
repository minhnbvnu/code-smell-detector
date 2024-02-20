function shaderFromBitPermutation(span, bitPermutation) {
    let bitMoveLines = [];
    for (let i = 0; i < span; i++) {
        bitMoveLines.push(`r += mod(floor(out_id / ${1 << bitPermutation(i, span)}.0), 2.0) * ${1 << i}.0;`);
    }

    return ketShaderPermute(
        '',
        `
            float r = 0.0;
            ${bitMoveLines.join(`
            `)}
            return r;
        `,
        span);
}