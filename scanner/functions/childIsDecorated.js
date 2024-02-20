function childIsDecorated(useLegacyDecorators, node, parent2) {
            switch (node.kind) {
                case 260 /* ClassDeclaration */:
                    return some(node.members, (m) => nodeOrChildIsDecorated(useLegacyDecorators, m, node, parent2));
                case 228 /* ClassExpression */:
                    return !useLegacyDecorators && some(node.members, (m) => nodeOrChildIsDecorated(useLegacyDecorators, m, node, parent2));
                case 171 /* MethodDeclaration */:
                case 175 /* SetAccessor */:
                case 173 /* Constructor */:
                    return some(node.parameters, (p) => nodeIsDecorated(useLegacyDecorators, p, node, parent2));
                default:
                    return false;
            }
        }