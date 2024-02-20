function desugarComprehension(node) {
    var genexp = node.type === GENERATOR;
    var tmp = generateTemp(node);
    var body;
    if (genexp) {
        body = node.synth({
            type: SEMICOLON,
            value: "yield",
            expression: node.synth({
                type: YIELD,
                value: node.expression
            })
        });
    } else {
        body = node.synth({
            type: SEMICOLON,
            value: tmp.value,
            expression: node.synth({
                type: ASSIGN,
                children: [
                    node.synth({
                        type: INDEX,
                        value: "[",
                        children: [
                            tmp,
                            node.synth({
                                type: MINUS,
                                value: "-",
                                children: [
                                    node.synth({
                                        type: DOT,
                                        value: ".",
                                        children: [tmp, id(node, "length")]
                                    }),
                                    node.synth({
                                        type: NUMBER,
                                        value: 1
                                    })
                                ]
                            })
                        ]
                    }),
                    node.expression
                ]
            })
        });
    }
    if (node.guard) {
        body = node.guard.synth({
            type: IF,
            value: "if",
            condition: node.guard,
            thenPart: body,
            elsePart: null
        });
    }
    var a = node.tail.children;
    for (var i = a.length - 1; i >= 0; i--) {
        a[i].type = LET;
        a[i].body = body;
        body = a[i].body;
    }
    var stmts = [body];
    var decl = null;
    if (!genexp) {
        decl = node.synth({
            type: VAR,
            value: "var",
            children: [node.synth({
                type: IDENTIFIER,
                value: tmp.value,
                name: tmp.value,
                readOnly: false,
                initializer: node.synth({
                    type: ARRAY_INIT,
                    value: "[",
                }),
                blockComment: null
            })],
            destructurings: [],
            blockComments: []
        });
        stmts.unshift(decl);
        stmts.push(node.synth({
            type: RETURN,
            value: tmp,
            blockComments: []
        }));
    }
    var fn = node.synth({
        type: FUNCTION,
        value: "function",
        params: [],
        paramComments: [],
        body: node.synth({
            type: SCRIPT,
            value: "{",
            children: stmts,
            funDecls: [],
            varDecls: decl ? [decl] : [],
            modDefns: new Dict(),
            modAssns: new Dict(),
            modDecls: new Dict(),
            modLoads: new Dict(),
            impDecls: [],
            expDecls: [],
            exports: new Dict(),
            hasEmptyReturn: false,
            hasReturnWithValue: !genexp,
            isGenerator: genexp
        }),
        functionForm: parser.EXPRESSED_FORM,
        parenthesized: true
    });
    var call = node.synth({
        type: CALL,
        value: "(",
        children: [fn, node.synth({ type: LIST, value: "(" })]
    });
    return desugarExpression(call);
}