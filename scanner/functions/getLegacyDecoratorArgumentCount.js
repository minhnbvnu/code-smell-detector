function getLegacyDecoratorArgumentCount(node, signature) {
                switch (node.parent.kind) {
                    case 260 /* ClassDeclaration */:
                    case 228 /* ClassExpression */:
                        return 1;
                    case 169 /* PropertyDeclaration */:
                        return hasAccessorModifier(node.parent) ? 3 : 2;
                    case 171 /* MethodDeclaration */:
                    case 174 /* GetAccessor */:
                    case 175 /* SetAccessor */:
                        return languageVersion === 0 /* ES3 */ || signature.parameters.length <= 2 ? 2 : 3;
                    case 166 /* Parameter */:
                        return 3;
                    default:
                        return Debug.fail();
                }
            }