function shouldMarkIdentifierAliasReferenced(node) {
                var _a2;
                const parent2 = node.parent;
                if (parent2) {
                    if (isPropertyAccessExpression(parent2) && parent2.expression === node) {
                        return false;
                    }
                    if (isExportSpecifier(parent2) && parent2.isTypeOnly) {
                        return false;
                    }
                    const greatGrandparent = (_a2 = parent2.parent) == null ? void 0 : _a2.parent;
                    if (greatGrandparent && isExportDeclaration(greatGrandparent) && greatGrandparent.isTypeOnly) {
                        return false;
                    }
                }
                return true;
            }