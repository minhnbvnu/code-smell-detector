function checkSpacingForModuleDeclaration(node) {
                const firstToken = sourceCode.getFirstToken(node);
                checkSpacingBefore(firstToken, PREV_TOKEN_M);
                checkSpacingAfter(firstToken, NEXT_TOKEN_M);
                if (node.type === "ExportDefaultDeclaration") {
                    checkSpacingAround(sourceCode.getTokenAfter(firstToken));
                }
                if (node.type === "ExportAllDeclaration" && node.exported) {
                    const asToken = sourceCode.getTokenBefore(node.exported);
                    checkSpacingBefore(asToken, PREV_TOKEN_M);
                    checkSpacingAfter(asToken, NEXT_TOKEN_M);
                }
                if (node.source) {
                    const fromToken = sourceCode.getTokenBefore(node.source);
                    checkSpacingBefore(fromToken, PREV_TOKEN_M);
                    checkSpacingAfter(fromToken, NEXT_TOKEN_M);
                }
            }