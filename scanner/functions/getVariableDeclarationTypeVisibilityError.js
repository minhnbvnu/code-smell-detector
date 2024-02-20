function getVariableDeclarationTypeVisibilityError(symbolAccessibilityResult) {
                const diagnosticMessage = getVariableDeclarationTypeVisibilityDiagnosticMessage(symbolAccessibilityResult);
                return diagnosticMessage !== void 0 ? {
                    diagnosticMessage,
                    errorNode: node,
                    typeName: node.name
                } : void 0;
            }