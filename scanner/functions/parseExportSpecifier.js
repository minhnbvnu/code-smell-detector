function parseExportSpecifier() {
                        const hasJSDoc = hasPrecedingJSDocComment();
                        return withJSDoc(parseImportOrExportSpecifier(278 /* ExportSpecifier */), hasJSDoc);
                    }