function getMethodNameVisibilityError(symbolAccessibilityResult) {
                const diagnosticMessage = getMethodNameVisibilityDiagnosticMessage(symbolAccessibilityResult);
                return diagnosticMessage !== void 0 ? {
                    diagnosticMessage,
                    errorNode: node,
                    typeName: node.name
                } : void 0;
            }