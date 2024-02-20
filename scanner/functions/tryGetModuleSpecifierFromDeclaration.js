function tryGetModuleSpecifierFromDeclaration(node) {
            var _a2, _b;
            switch (node.kind) {
                case 257 /* VariableDeclaration */:
                case 205 /* BindingElement */:
                    return (_a2 = findAncestor(node.initializer, (node2) => isRequireCall(node2, 
                    /*requireStringLiteralLikeArgument*/
                    true))) == null ? void 0 : _a2.arguments[0];
                case 269 /* ImportDeclaration */:
                    return tryCast(node.moduleSpecifier, isStringLiteralLike);
                case 268 /* ImportEqualsDeclaration */:
                    return tryCast((_b = tryCast(node.moduleReference, isExternalModuleReference)) == null ? void 0 : _b.expression, isStringLiteralLike);
                case 270 /* ImportClause */:
                case 277 /* NamespaceExport */:
                    return tryCast(node.parent.moduleSpecifier, isStringLiteralLike);
                case 271 /* NamespaceImport */:
                case 278 /* ExportSpecifier */:
                    return tryCast(node.parent.parent.moduleSpecifier, isStringLiteralLike);
                case 273 /* ImportSpecifier */:
                    return tryCast(node.parent.parent.parent.moduleSpecifier, isStringLiteralLike);
                default:
                    Debug.assertNever(node);
            }
        }