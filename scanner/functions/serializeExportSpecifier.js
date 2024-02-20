function serializeExportSpecifier(localName, targetName, specifier) {
                        addResult(factory.createExportDeclaration(
                        /*modifiers*/
                        void 0, 
                        /*isTypeOnly*/
                        false, factory.createNamedExports([factory.createExportSpecifier(
                            /*isTypeOnly*/
                            false, localName !== targetName ? targetName : void 0, localName)]), specifier), 0 /* None */);
                    }