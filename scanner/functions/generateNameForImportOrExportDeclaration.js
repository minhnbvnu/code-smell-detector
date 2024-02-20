function generateNameForImportOrExportDeclaration(node) {
                const expr = getExternalModuleName(node);
                const baseName = isStringLiteral(expr) ? makeIdentifierFromModuleName(expr.text) : "module";
                return makeUniqueName2(baseName, isUniqueName, 
                /*optimistic*/
                false, 
                /*scoped*/
                false, 
                /*privateName*/
                false, 
                /*prefix*/
                "", 
                /*suffix*/
                "");
            }