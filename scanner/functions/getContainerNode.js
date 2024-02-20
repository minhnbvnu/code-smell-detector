function getContainerNode(node) {
            if (isJSDocTypeAlias(node)) {
                node = node.parent.parent;
            }
            while (true) {
                node = node.parent;
                if (!node) {
                    return void 0;
                }
                switch (node.kind) {
                    case 308 /* SourceFile */:
                    case 171 /* MethodDeclaration */:
                    case 170 /* MethodSignature */:
                    case 259 /* FunctionDeclaration */:
                    case 215 /* FunctionExpression */:
                    case 174 /* GetAccessor */:
                    case 175 /* SetAccessor */:
                    case 260 /* ClassDeclaration */:
                    case 261 /* InterfaceDeclaration */:
                    case 263 /* EnumDeclaration */:
                    case 264 /* ModuleDeclaration */:
                        return node;
                }
            }
        }