function isPropertyAccessNamespaceReference(node) {
            let root = node;
            let isLastClause = true;
            if (root.parent.kind === 208 /* PropertyAccessExpression */) {
                while (root.parent && root.parent.kind === 208 /* PropertyAccessExpression */) {
                    root = root.parent;
                }
                isLastClause = root.name === node;
            }
            if (!isLastClause && root.parent.kind === 230 /* ExpressionWithTypeArguments */ && root.parent.parent.kind === 294 /* HeritageClause */) {
                const decl = root.parent.parent.parent;
                return decl.kind === 260 /* ClassDeclaration */ && root.parent.parent.token === 117 /* ImplementsKeyword */ || decl.kind === 261 /* InterfaceDeclaration */ && root.parent.parent.token === 94 /* ExtendsKeyword */;
            }
            return false;
        }