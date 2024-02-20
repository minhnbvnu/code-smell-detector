function isPrototypeProperty(symbol) {
                if (symbol.flags & 8192 /* Method */ || getCheckFlags(symbol) & 4 /* SyntheticMethod */) {
                    return true;
                }
                if (isInJSFile(symbol.valueDeclaration)) {
                    const parent2 = symbol.valueDeclaration.parent;
                    return parent2 && isBinaryExpression(parent2) && getAssignmentDeclarationKind(parent2) === 3 /* PrototypeProperty */;
                }
            }