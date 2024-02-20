function getAliasDeclarationFromName(node) {
            switch (node.parent.kind) {
                case 270 /* ImportClause */:
                case 273 /* ImportSpecifier */:
                case 271 /* NamespaceImport */:
                case 278 /* ExportSpecifier */:
                case 274 /* ExportAssignment */:
                case 268 /* ImportEqualsDeclaration */:
                case 277 /* NamespaceExport */:
                    return node.parent;
                case 163 /* QualifiedName */:
                    do {
                        node = node.parent;
                    } while (node.parent.kind === 163 /* QualifiedName */);
                    return getAliasDeclarationFromName(node);
            }
        }