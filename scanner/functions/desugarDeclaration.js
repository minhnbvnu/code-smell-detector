function desugarDeclaration(decl) {
    var vars = [];
    var assignments = [];
    decl.children.forEach(function(init) {
        if (!init.initializer) {
            vars.push(init);
            return;
        }
        if (typeof init.name === "string") {
            vars.push(init);
            init.initializer = desugarExpression(init.initializer);
            return;
        }
        extractBindings(vars, init.name);
        assignments.push(desugarAssignment(varInitializerToAssignment(init)));
    });

    var dummy = generateTemp(decl);
    if (assignments.length > 0) {
        vars.push(decl.synth({
            type: IDENTIFIER,
            value: dummy.value,
            children: [],
            name: dummy.value,
            // FIXME: handle const
            readOnly: false,
            blockComment: null,
            initializer: list(decl, assignments)
        }));
    }
    [].splice.apply(decl.children, [0, decl.children.length].concat(vars));
}