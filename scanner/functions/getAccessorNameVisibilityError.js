function getAccessorNameVisibilityError(symbolAccessibilityResult) {
                const diagnosticMessage = getAccessorNameVisibilityDiagnosticMessage(symbolAccessibilityResult);
                return diagnosticMessage !== void 0 ? {
                    diagnosticMessage,
                    errorNode: node,
                    typeName: node.name
                } : void 0;
            }