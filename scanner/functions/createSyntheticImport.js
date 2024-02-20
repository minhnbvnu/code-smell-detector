function createSyntheticImport(text, file) {
                const externalHelpersModuleReference = factory.createStringLiteral(text);
                const importDecl = factory.createImportDeclaration(
                /*modifiers*/
                void 0, 
                /*importClause*/
                void 0, externalHelpersModuleReference, 
                /*assertClause*/
                void 0);
                addInternalEmitFlags(importDecl, 2 /* NeverApplyImportHelper */);
                setParent(externalHelpersModuleReference, importDecl);
                setParent(importDecl, file);
                externalHelpersModuleReference.flags &= ~8 /* Synthesized */;
                importDecl.flags &= ~8 /* Synthesized */;
                return externalHelpersModuleReference;
            }