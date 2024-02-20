function getParameterDeclarationTypeVisibilityError(symbolAccessibilityResult) {
                const diagnosticMessage = getParameterDeclarationTypeVisibilityDiagnosticMessage(symbolAccessibilityResult);
                return diagnosticMessage !== void 0 ? {
                    diagnosticMessage,
                    errorNode: node,
                    typeName: node.name
                } : void 0;
            }