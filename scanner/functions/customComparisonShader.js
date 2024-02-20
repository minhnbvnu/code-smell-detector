function customComparisonShader(compareCode) {
    const shader = ketShaderPermute(
        `
            ${ketInputGateShaderCode('A')}
            ${ketInputGateShaderCode('B')}
        `,
        `
            float lhs = read_input_A();
            float rhs = read_input_B();
            return mod(out_id + ((${compareCode}) ? 1.0 : 0.0), 2.0);`);

    return ctx => shader.withArgs(...ketArgs(ctx, 1, ['A', 'B']));
}