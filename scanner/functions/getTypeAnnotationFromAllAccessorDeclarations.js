function getTypeAnnotationFromAllAccessorDeclarations(node, accessors) {
                let accessorType = getTypeAnnotationFromAccessor(node);
                if (!accessorType && node !== accessors.firstAccessor) {
                    accessorType = getTypeAnnotationFromAccessor(accessors.firstAccessor);
                    getSymbolAccessibilityDiagnostic = createGetSymbolAccessibilityDiagnosticForNode(accessors.firstAccessor);
                }
                if (!accessorType && accessors.secondAccessor && node !== accessors.secondAccessor) {
                    accessorType = getTypeAnnotationFromAccessor(accessors.secondAccessor);
                    getSymbolAccessibilityDiagnostic = createGetSymbolAccessibilityDiagnosticForNode(accessors.secondAccessor);
                }
                return accessorType;
            }