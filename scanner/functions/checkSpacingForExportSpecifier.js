function checkSpacingForExportSpecifier(node) {
                if (node.local.range[0] !== node.exported.range[0]) {
                    const asToken = sourceCode.getTokenBefore(node.exported);
                    checkSpacingBefore(asToken, PREV_TOKEN_M);
                    checkSpacingAfter(asToken, NEXT_TOKEN_M);
                }
            }