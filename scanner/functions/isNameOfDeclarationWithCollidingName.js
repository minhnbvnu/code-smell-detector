function isNameOfDeclarationWithCollidingName(node) {
                switch (node.parent.kind) {
                    case 205 /* BindingElement */:
                    case 260 /* ClassDeclaration */:
                    case 263 /* EnumDeclaration */:
                    case 257 /* VariableDeclaration */:
                        return node.parent.name === node && resolver.isDeclarationWithCollidingName(node.parent);
                }
                return false;
            }