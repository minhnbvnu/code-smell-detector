function isLiteralNameOfPropertyDeclarationOrIndexAccess(node) {
            switch (node.parent.kind) {
                case 169 /* PropertyDeclaration */:
                case 168 /* PropertySignature */:
                case 299 /* PropertyAssignment */:
                case 302 /* EnumMember */:
                case 171 /* MethodDeclaration */:
                case 170 /* MethodSignature */:
                case 174 /* GetAccessor */:
                case 175 /* SetAccessor */:
                case 264 /* ModuleDeclaration */:
                    return getNameOfDeclaration(node.parent) === node;
                case 209 /* ElementAccessExpression */:
                    return node.parent.argumentExpression === node;
                case 164 /* ComputedPropertyName */:
                    return true;
                case 198 /* LiteralType */:
                    return node.parent.parent.kind === 196 /* IndexedAccessType */;
                default:
                    return false;
            }
        }