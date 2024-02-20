function createExternalModuleExport(exportName) {
                return createExportDeclaration(
                /*modifiers*/
                void 0, 
                /*isTypeOnly*/
                false, createNamedExports([
                    createExportSpecifier(
                    /*isTypeOnly*/
                    false, 
                    /*propertyName*/
                    void 0, exportName)
                ]));
            }