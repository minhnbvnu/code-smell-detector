function isNamedClassElement(node) {
            switch (node.kind) {
                case 171 /* MethodDeclaration */:
                case 174 /* GetAccessor */:
                case 175 /* SetAccessor */:
                case 169 /* PropertyDeclaration */:
                    return true;
                default:
                    return false;
            }
        }