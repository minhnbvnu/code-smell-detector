function getContextNode(node) {
            if (!node)
                return void 0;
            switch (node.kind) {
                case 257 /* VariableDeclaration */:
                    return !isVariableDeclarationList(node.parent) || node.parent.declarations.length !== 1 ? node : isVariableStatement(node.parent.parent) ? node.parent.parent : isForInOrOfStatement(node.parent.parent) ? getContextNode(node.parent.parent) : node.parent;
                case 205 /* BindingElement */:
                    return getContextNode(node.parent.parent);
                case 273 /* ImportSpecifier */:
                    return node.parent.parent.parent;
                case 278 /* ExportSpecifier */:
                case 271 /* NamespaceImport */:
                    return node.parent.parent;
                case 270 /* ImportClause */:
                case 277 /* NamespaceExport */:
                    return node.parent;
                case 223 /* BinaryExpression */:
                    return isExpressionStatement(node.parent) ? node.parent : node;
                case 247 /* ForOfStatement */:
                case 246 /* ForInStatement */:
                    return {
                        start: node.initializer,
                        end: node.expression
                    };
                case 299 /* PropertyAssignment */:
                case 300 /* ShorthandPropertyAssignment */:
                    return isArrayLiteralOrObjectLiteralDestructuringPattern(node.parent) ? getContextNode(findAncestor(node.parent, (node2) => isBinaryExpression(node2) || isForInOrOfStatement(node2))) : node;
                default:
                    return node;
            }
        }