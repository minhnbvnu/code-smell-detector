function isTypeOnlyExportDeclaration(node) {
            switch (node.kind) {
                case 278 /* ExportSpecifier */:
                    return node.isTypeOnly || node.parent.parent.isTypeOnly;
                case 275 /* ExportDeclaration */:
                    return node.isTypeOnly && !!node.moduleSpecifier && !node.exportClause;
                case 277 /* NamespaceExport */:
                    return node.parent.isTypeOnly;
            }
            return false;
        }