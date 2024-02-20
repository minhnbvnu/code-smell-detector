function checkRootNode(node2) {
                if (isIdentifier(isExpressionStatement(node2) ? node2.expression : node2)) {
                    return [createDiagnosticForNode(node2, Messages.cannotExtractIdentifier)];
                }
                return void 0;
            }