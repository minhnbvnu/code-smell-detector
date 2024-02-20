function isClassElementLikeHasJSDoc(node) {
            switch (node.kind) {
                case 173 /* Constructor */:
                case 169 /* PropertyDeclaration */:
                case 171 /* MethodDeclaration */:
                case 174 /* GetAccessor */:
                case 175 /* SetAccessor */:
                    return true;
                case 166 /* Parameter */:
                    return isParameterPropertyDeclaration(node, node.parent);
                default:
                    return false;
            }
        }