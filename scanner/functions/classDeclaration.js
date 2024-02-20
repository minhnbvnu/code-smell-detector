function classDeclaration() {
    const program = esprima(`
        class Hello {
        };
    `);
    return program.body[0];
}