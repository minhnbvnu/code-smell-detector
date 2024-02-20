function tryGetImportFromModuleSpecifier(node) {
            switch (node.parent.kind) {
                case 269 /* ImportDeclaration */:
                case 275 /* ExportDeclaration */:
                    return node.parent;
                case 280 /* ExternalModuleReference */:
                    return node.parent.parent;
                case 210 /* CallExpression */:
                    return isImportCall(node.parent) || isRequireCall(node.parent, 
                    /*checkArg*/
                    false) ? node.parent : void 0;
                case 198 /* LiteralType */:
                    Debug.assert(isStringLiteral(node));
                    return tryCast(node.parent.parent, isImportTypeNode);
                default:
                    return void 0;
            }
        }