function inspectVariableDeclarationTuple(emitted) {
            let node = emitted.node, declarations = node.declarations;

            function inspectVariableDeclaratorForWhitespace(vd) {
                let charAfterExpr = sourceCode.getNextChar(vd);

                (charAfterExpr !== ",") && context.report({
                    node: vd,
                    location: {
                        column: sourceCode.getEndingColumn(vd) + 1
                    },
                    message: "'" + vd.id.name + "': identifier should be immediately followed by a comma without any whitespace in between."
                });
            }

            if (emitted.exit) {
                return;
            }

            declarations.slice(0, -1).forEach(inspectVariableDeclaratorForWhitespace);
        }