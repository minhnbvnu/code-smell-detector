function hasOnlyExpressionInitializer(node) {
            switch (node.kind) {
                case 257 /* VariableDeclaration */:
                case 166 /* Parameter */:
                case 205 /* BindingElement */:
                case 169 /* PropertyDeclaration */:
                case 299 /* PropertyAssignment */:
                case 302 /* EnumMember */:
                    return true;
                default:
                    return false;
            }
        }