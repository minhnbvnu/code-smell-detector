function getMembersOfDeclaration(node) {
            switch (node.kind) {
                case 261 /* InterfaceDeclaration */:
                case 260 /* ClassDeclaration */:
                case 228 /* ClassExpression */:
                case 184 /* TypeLiteral */:
                    return node.members;
                case 207 /* ObjectLiteralExpression */:
                    return node.properties;
            }
        }