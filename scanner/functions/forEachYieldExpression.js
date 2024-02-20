function forEachYieldExpression(body, visitor) {
            return traverse(body);
            function traverse(node) {
                switch (node.kind) {
                    case 226 /* YieldExpression */:
                        visitor(node);
                        const operand = node.expression;
                        if (operand) {
                            traverse(operand);
                        }
                        return;
                    case 263 /* EnumDeclaration */:
                    case 261 /* InterfaceDeclaration */:
                    case 264 /* ModuleDeclaration */:
                    case 262 /* TypeAliasDeclaration */:
                        return;
                    default:
                        if (isFunctionLike(node)) {
                            if (node.name && node.name.kind === 164 /* ComputedPropertyName */) {
                                traverse(node.name.expression);
                                return;
                            }
                        }
                        else if (!isPartOfTypeNode(node)) {
                            forEachChild(node, traverse);
                        }
                }
            }
        }