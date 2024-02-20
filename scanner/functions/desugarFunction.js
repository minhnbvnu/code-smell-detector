function desugarFunction(node) {
    // expression bodies are desugared to ordinary function bodies
    if (node.body.type !== SCRIPT) {
        var body = node.body;
        // FIXME: this should be abstracted away in jsparse
        node.body = body.synth({
            type: SCRIPT,
            value: "{",
            children: [body.synth({
                type: RETURN,
                value: body
            })],
            funDecls: [],
            varDecls: [],
            modDefns: new Dict(),
            modAssns: new Dict(),
            modDecls: new Dict(),
            modLoads: new Dict(),
            impDecls: [],
            expDecls: [],
            exports: new Dict(),
            hasEmptyReturn: false,
            hasReturnWithValue: true,
            isGenerator: false
        });
    }

    var newInits = [];
    node.params.forEach(function(param, i) {
        if (typeof param === "string")
            return;

        var temp = generateTemp(param);
        var init = param.synth({
            type: IDENTIFIER,
            value: "}",
            children: [],
            name: param,
            readOnly: false,
            blockComment: null,
            initializer: temp
        });
        node.params[i] = temp.value;
        newInits.push(init);
    });
    if (newInits.length > 0) {
        var newDecl = node.synth({
            type: VAR,
            value: "var",
            children: newInits,
            // FIXME: not correct, but I think we're not using this
            destructurings: [],
            blockComments: []
        });
        node.body.children.unshift(newDecl);
        node.body.varDecls.push(newDecl);
    }
    desugarStatements(node.body);
}