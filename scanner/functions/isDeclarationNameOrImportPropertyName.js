function isDeclarationNameOrImportPropertyName(name) {
            switch (name.parent.kind) {
                case 273 /* ImportSpecifier */:
                case 278 /* ExportSpecifier */:
                    return isIdentifier(name);
                default:
                    return isDeclarationName(name);
            }
        }