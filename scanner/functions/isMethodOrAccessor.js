function isMethodOrAccessor(node) {
            switch (node.kind) {
                case 171 /* MethodDeclaration */:
                case 174 /* GetAccessor */:
                case 175 /* SetAccessor */:
                    return true;
                default:
                    return false;
            }
        }