function isParameterOfContextSensitiveSignature(symbol) {
                let decl = symbol.valueDeclaration;
                if (!decl) {
                    return false;
                }
                if (isBindingElement(decl)) {
                    decl = walkUpBindingElementsAndPatterns(decl);
                }
                if (isParameter(decl)) {
                    return isContextSensitiveFunctionOrObjectLiteralMethod(decl.parent);
                }
                return false;
            }