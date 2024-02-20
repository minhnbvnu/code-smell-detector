function canHaveLiteralInitializer(node) {
            switch (node.kind) {
                case 169 /* PropertyDeclaration */:
                case 168 /* PropertySignature */:
                    return !hasEffectiveModifier(node, 8 /* Private */);
                case 166 /* Parameter */:
                case 257 /* VariableDeclaration */:
                    return true;
            }
            return false;
        }