function getTargetOfAliasDeclaration(node, dontRecursivelyResolve = false) {
                switch (node.kind) {
                    case 268 /* ImportEqualsDeclaration */:
                    case 257 /* VariableDeclaration */:
                        return getTargetOfImportEqualsDeclaration(node, dontRecursivelyResolve);
                    case 270 /* ImportClause */:
                        return getTargetOfImportClause(node, dontRecursivelyResolve);
                    case 271 /* NamespaceImport */:
                        return getTargetOfNamespaceImport(node, dontRecursivelyResolve);
                    case 277 /* NamespaceExport */:
                        return getTargetOfNamespaceExport(node, dontRecursivelyResolve);
                    case 273 /* ImportSpecifier */:
                    case 205 /* BindingElement */:
                        return getTargetOfImportSpecifier(node, dontRecursivelyResolve);
                    case 278 /* ExportSpecifier */:
                        return getTargetOfExportSpecifier(node, 111551 /* Value */ | 788968 /* Type */ | 1920 /* Namespace */, dontRecursivelyResolve);
                    case 274 /* ExportAssignment */:
                    case 223 /* BinaryExpression */:
                        return getTargetOfExportAssignment(node, dontRecursivelyResolve);
                    case 267 /* NamespaceExportDeclaration */:
                        return getTargetOfNamespaceExportDeclaration(node, dontRecursivelyResolve);
                    case 300 /* ShorthandPropertyAssignment */:
                        return resolveEntityName(node.name, 111551 /* Value */ | 788968 /* Type */ | 1920 /* Namespace */, 
                        /*ignoreErrors*/
                        true, dontRecursivelyResolve);
                    case 299 /* PropertyAssignment */:
                        return getTargetOfAliasLikeExpression(node.initializer, dontRecursivelyResolve);
                    case 209 /* ElementAccessExpression */:
                    case 208 /* PropertyAccessExpression */:
                        return getTargetOfAccessExpression(node, dontRecursivelyResolve);
                    default:
                        return Debug.fail();
                }
            }