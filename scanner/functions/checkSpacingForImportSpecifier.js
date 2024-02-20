function checkSpacingForImportSpecifier(node) {
                if (node.imported.range[0] !== node.local.range[0]) {
                    const asToken = sourceCode.getTokenBefore(node.local);
                    checkSpacingBefore(asToken, PREV_TOKEN_M);
                }
            }