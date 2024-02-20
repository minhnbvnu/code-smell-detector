function checkSpacingForImportNamespaceSpecifier(node) {
                const asToken = sourceCode.getFirstToken(node, 1);
                checkSpacingBefore(asToken, PREV_TOKEN_M);
            }