function isPartOfPossiblyValidTypeOrAbstractComputedPropertyName(node) {
            while (node.kind === 79 /* Identifier */ || node.kind === 208 /* PropertyAccessExpression */) {
                node = node.parent;
            }
            if (node.kind !== 164 /* ComputedPropertyName */) {
                return false;
            }
            if (hasSyntacticModifier(node.parent, 256 /* Abstract */)) {
                return true;
            }
            const containerKind = node.parent.parent.kind;
            return containerKind === 261 /* InterfaceDeclaration */ || containerKind === 184 /* TypeLiteral */;
        }