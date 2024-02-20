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