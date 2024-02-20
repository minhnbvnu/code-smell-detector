function getModuleSpecifierForImportOrExport(node) {
                switch (node.kind) {
                    case 270 /* ImportClause */:
                        return node.parent.moduleSpecifier;
                    case 268 /* ImportEqualsDeclaration */:
                        return isExternalModuleReference(node.moduleReference) ? node.moduleReference.expression : void 0;
                    case 271 /* NamespaceImport */:
                        return node.parent.parent.moduleSpecifier;
                    case 273 /* ImportSpecifier */:
                        return node.parent.parent.parent.moduleSpecifier;
                    case 278 /* ExportSpecifier */:
                        return node.parent.parent.moduleSpecifier;
                    default:
                        return Debug.assertNever(node);
                }
            }