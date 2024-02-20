function nodeIsTypeScriptDeclWithBlockContext(node) {
            switch (node.kind) {
                case 260 /* ClassDeclaration */:
                case 228 /* ClassExpression */:
                case 261 /* InterfaceDeclaration */:
                case 263 /* EnumDeclaration */:
                case 184 /* TypeLiteral */:
                case 264 /* ModuleDeclaration */:
                case 275 /* ExportDeclaration */:
                case 276 /* NamedExports */:
                case 269 /* ImportDeclaration */:
                case 272 /* NamedImports */:
                    return true;
            }
            return false;
        }