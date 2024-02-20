function isIdentifierInNonEmittingHeritageClause(node) {
            if (node.kind !== 79 /* Identifier */)
                return false;
            const heritageClause = findAncestor(node.parent, (parent2) => {
                switch (parent2.kind) {
                    case 294 /* HeritageClause */:
                        return true;
                    case 208 /* PropertyAccessExpression */:
                    case 230 /* ExpressionWithTypeArguments */:
                        return false;
                    default:
                        return "quit";
                }
            });
            return (heritageClause == null ? void 0 : heritageClause.token) === 117 /* ImplementsKeyword */ || (heritageClause == null ? void 0 : heritageClause.parent.kind) === 261 /* InterfaceDeclaration */;
        }