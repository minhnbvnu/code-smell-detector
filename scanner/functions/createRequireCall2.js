function createRequireCall2(importNode) {
                const moduleName = getExternalModuleNameLiteral(factory2, importNode, Debug.checkDefined(currentSourceFile), host, resolver, compilerOptions);
                const args = [];
                if (moduleName) {
                    args.push(moduleName);
                }
                if (!importRequireStatements) {
                    const createRequireName = factory2.createUniqueName("_createRequire", 16 /* Optimistic */ | 32 /* FileLevel */);
                    const importStatement = factory2.createImportDeclaration(
                    /*modifiers*/
                    void 0, factory2.createImportClause(
                    /*isTypeOnly*/
                    false, 
                    /*name*/
                    void 0, factory2.createNamedImports([
                        factory2.createImportSpecifier(
                        /*isTypeOnly*/
                        false, factory2.createIdentifier("createRequire"), createRequireName)
                    ])), factory2.createStringLiteral("module"));
                    const requireHelperName = factory2.createUniqueName("__require", 16 /* Optimistic */ | 32 /* FileLevel */);
                    const requireStatement = factory2.createVariableStatement(
                    /*modifiers*/
                    void 0, factory2.createVariableDeclarationList([
                        factory2.createVariableDeclaration(requireHelperName, 
                        /*exclamationToken*/
                        void 0, 
                        /*type*/
                        void 0, factory2.createCallExpression(factory2.cloneNode(createRequireName), 
                        /*typeArguments*/
                        void 0, [
                            factory2.createPropertyAccessExpression(factory2.createMetaProperty(100 /* ImportKeyword */, factory2.createIdentifier("meta")), factory2.createIdentifier("url"))
                        ]))
                    ], 
                    /*flags*/
                    languageVersion >= 2 /* ES2015 */ ? 2 /* Const */ : 0 /* None */));
                    importRequireStatements = [importStatement, requireStatement];
                }
                const name = importRequireStatements[1].declarationList.declarations[0].name;
                Debug.assertNode(name, isIdentifier);
                return factory2.createCallExpression(factory2.cloneNode(name), 
                /*typeArguments*/
                void 0, args);
            }