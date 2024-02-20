function checkTypeLiteralDiagnostics() {
                    const type = getTypeFromTypeLiteralOrFunctionOrConstructorTypeNode(node);
                    checkIndexConstraints(type, type.symbol);
                    checkTypeForDuplicateIndexSignatures(node);
                    checkObjectTypeForDuplicateDeclarations(node);
                }