function reExportDefault(moduleSpecifier) {
            return makeExportDeclaration([factory.createExportSpecifier(
                /*isTypeOnly*/
                false, 
                /*propertyName*/
                void 0, "default")], moduleSpecifier);
        }