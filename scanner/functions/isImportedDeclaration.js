function isImportedDeclaration(node) {
                return node.kind === 270 /* ImportClause */ || node.kind === 273 /* ImportSpecifier */ || node.kind === 271 /* NamespaceImport */;
            }