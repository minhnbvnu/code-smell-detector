function isConstructorParameterCompletion(node2) {
                return !!node2.parent && isParameter(node2.parent) && isConstructorDeclaration(node2.parent.parent) && (isParameterPropertyModifier(node2.kind) || isDeclarationName(node2));
            }