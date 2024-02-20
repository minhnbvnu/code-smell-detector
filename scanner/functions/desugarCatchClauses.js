function desugarCatchClauses(node) {
    var catches = node.catchClauses;
    if (catches.length === 0)
        return;

    if (catches.length === 1 && !catches[0].guard) {
        desugarStatement(catches[0].block);
        return;
    }

    var tmp = generateTemp(node);
    var caught = generateTemp(node);

    var last = catches.length - 1;
    var stmts = catches.map(function(catchNode, i) {
        if (i === last && !catchNode.guard) {
            // let (x = $t) { if (!$caught) B }
            var init = catchNode.synth({
                type: IDENTIFIER,
                value: catchNode.varName,
                name: catchNode.varName,
                readOnly: false,
                initializer: tmp,
                blockComment: null
            });
            return catchNode.synth({
                type: LET_BLOCK,
                value: "let",
                varDecls: [init],
                variables: catchNode.synth({
                    type: LET,
                    value: "(",
                    children: [init],
                    destructurings: []
                }),
                block: catchNode.synth({
                    type: BLOCK,
                    value: "{",
                    children: [catchNode.synth({
                        type: IF,
                        value: "if",
                        condition: catchNode.synth({
                            type: NOT,
                            value: "!",
                            children: [caught],
                            labels: new Dict()
                        }),
                        thenPart: catchNode.block,
                        elsePart: null
                    })],
                    varDecls: [],
                    labels: new Dict()
                }),
                blockComments: []
            });
        }

        // let (xi = $t) { if (!$caught && ei) { $caught = true; Bi } }
        var init = catchNode.synth({
            type: IDENTIFIER,
            value: catchNode.varName,
            name: catchNode.varName,
            readOnly: false,
            initializer: tmp,
            blockComment: null
        });
        return catchNode.synth({
            type: LET_BLOCK,
            value: "let",
            varDecls: [init],
            variables: catchNode.synth({
                type: LET,
                value: "(",
                children: [init],
                destructurings: []
            }),
            block: catchNode.synth({
                type: BLOCK,
                value: "{",
                children: [catchNode.synth({
                    type: IF,
                    value: "if",
                    condition: catchNode.synth({
                        type: AND,
                        value: "&&",
                        children: [catchNode.synth({
                            type: NOT,
                            value: "!",
                            children: [caught],
                            labels: new Dict()
                        }), catchNode.guard]
                    }),
                    thenPart: catchNode.synth({
                        type: BLOCK,
                        value: "{",
                        children: [catchNode.synth({
                            type: SEMICOLON,
                            blockComments: [],
                            expression: catchNode.synth({
                                type: ASSIGN,
                                children: [caught, catchNode.synth({
                                    type: TRUE,
                                    value: "true"
                                })],
                                blockComment: null
                            })
                        }), catchNode.block],
                        varDecls: [],
                        labels: new Dict()
                    }),
                    elsePart: null
                })],
                varDecls: [],
                labels: new Dict()
            }),
            blockComments: []
        });
    });

    var lastCatch = catches[last];

    // let $caught = false;
    var initCaught = lastCatch.synth({
        type: LET,
        value: "let",
        children: [lastCatch.synth({
            type: IDENTIFIER,
            value: caught.value,
            name: caught.name,
            readOnly: false,
            initializer: lastCatch.synth({
                type: FALSE,
                value: "false"
            }),
            blockComment: null
        })],
        destructurings: [],
        blockComments: []
    });
    stmts.unshift(initCaught);

    if (lastCatch.catchGuard) {
        var guard = lastCatch.catchGuard;
        stmts.push(guard.synth({
            type: IF,
            value: "if",
            condition: guard.synth({
                type: NOT,
                value: "!",
                children: [caught],
                labels: new Dict()
            }),
            thenPart: guard.synth({
                type: THROW,
                value: "throw",
                exception: tmp,
                blockComments: []
            }),
            elsePart: null
        }));
    }

    var firstCatch = catches[0];
    catches.splice(0, catches.length, firstCatch.synth({
        type: CATCH,
        value: "catch",
        varName: tmp.value,
        block: firstCatch.synth({
            type: BLOCK,
            value: "{",
            children: stmts,
            varDecls: [initCaught],
            labels: new Dict()
        })
    }));
}