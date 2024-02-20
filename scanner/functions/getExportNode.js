function getExportNode(parent2, node) {
            const declaration = isVariableDeclaration(parent2) ? parent2 : isBindingElement(parent2) ? walkUpBindingElementsAndPatterns(parent2) : void 0;
            if (declaration) {
                return parent2.name !== node ? void 0 : isCatchClause(declaration.parent) ? void 0 : isVariableStatement(declaration.parent.parent) ? declaration.parent.parent : void 0;
            }
            else {
                return parent2;
            }
        }