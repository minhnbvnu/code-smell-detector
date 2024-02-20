function handleSymbolAccessibilityError(symbolAccessibilityResult) {
                if (symbolAccessibilityResult.accessibility === 0 /* Accessible */) {
                    if (symbolAccessibilityResult && symbolAccessibilityResult.aliasesToMakeVisible) {
                        if (!lateMarkedStatements) {
                            lateMarkedStatements = symbolAccessibilityResult.aliasesToMakeVisible;
                        }
                        else {
                            for (const ref of symbolAccessibilityResult.aliasesToMakeVisible) {
                                pushIfUnique(lateMarkedStatements, ref);
                            }
                        }
                    }
                }
                else {
                    const errorInfo = getSymbolAccessibilityDiagnostic(symbolAccessibilityResult);
                    if (errorInfo) {
                        if (errorInfo.typeName) {
                            context.addDiagnostic(createDiagnosticForNode(symbolAccessibilityResult.errorNode || errorInfo.errorNode, errorInfo.diagnosticMessage, getTextOfNode(errorInfo.typeName), symbolAccessibilityResult.errorSymbolName, symbolAccessibilityResult.errorModuleName));
                        }
                        else {
                            context.addDiagnostic(createDiagnosticForNode(symbolAccessibilityResult.errorNode || errorInfo.errorNode, errorInfo.diagnosticMessage, symbolAccessibilityResult.errorSymbolName, symbolAccessibilityResult.errorModuleName));
                        }
                        return true;
                    }
                }
                return false;
            }