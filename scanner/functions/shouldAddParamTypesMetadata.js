function shouldAddParamTypesMetadata(node) {
                switch (node.kind) {
                    case 260 /* ClassDeclaration */:
                    case 228 /* ClassExpression */:
                        return getFirstConstructorWithBody(node) !== void 0;
                    case 171 /* MethodDeclaration */:
                    case 174 /* GetAccessor */:
                    case 175 /* SetAccessor */:
                        return true;
                }
                return false;
            }