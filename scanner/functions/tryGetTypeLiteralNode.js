function tryGetTypeLiteralNode(node) {
            if (!node)
                return void 0;
            const parent2 = node.parent;
            switch (node.kind) {
                case 18 /* OpenBraceToken */:
                    if (isTypeLiteralNode(parent2)) {
                        return parent2;
                    }
                    break;
                case 26 /* SemicolonToken */:
                case 27 /* CommaToken */:
                case 79 /* Identifier */:
                    if (parent2.kind === 168 /* PropertySignature */ && isTypeLiteralNode(parent2.parent)) {
                        return parent2.parent;
                    }
                    break;
            }
            return void 0;
        }