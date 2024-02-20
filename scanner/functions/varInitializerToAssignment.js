function varInitializerToAssignment(init) {
    return init.synth({
        type: ASSIGN,
        children: [init.name, init.initializer],
        blockComment: null
    });
}