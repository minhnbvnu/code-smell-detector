function transformUMDModule(node) {
                const { aliasedModuleNames, unaliasedModuleNames, importAliasNames } = collectAsynchronousDependencies(node, 
                /*includeNonAmdDependencies*/
                false);
                const moduleName = tryGetModuleNameFromFile(factory2, node, host, compilerOptions);
                const umdHeader = factory2.createFunctionExpression(
                /*modifiers*/
                void 0, 
                /*asteriskToken*/
                void 0, 
                /*name*/
                void 0, 
                /*typeParameters*/
                void 0, [factory2.createParameterDeclaration(
                    /*modifiers*/
                    void 0, 
                    /*dotDotDotToken*/
                    void 0, "factory")], 
                /*type*/
                void 0, setTextRange(factory2.createBlock([
                    factory2.createIfStatement(factory2.createLogicalAnd(factory2.createTypeCheck(factory2.createIdentifier("module"), "object"), factory2.createTypeCheck(factory2.createPropertyAccessExpression(factory2.createIdentifier("module"), "exports"), "object")), factory2.createBlock([
                        factory2.createVariableStatement(
                        /*modifiers*/
                        void 0, [
                            factory2.createVariableDeclaration("v", 
                            /*exclamationToken*/
                            void 0, 
                            /*type*/
                            void 0, factory2.createCallExpression(factory2.createIdentifier("factory"), 
                            /*typeArguments*/
                            void 0, [
                                factory2.createIdentifier("require"),
                                factory2.createIdentifier("exports")
                            ]))
                        ]),
                        setEmitFlags(factory2.createIfStatement(factory2.createStrictInequality(factory2.createIdentifier("v"), factory2.createIdentifier("undefined")), factory2.createExpressionStatement(factory2.createAssignment(factory2.createPropertyAccessExpression(factory2.createIdentifier("module"), "exports"), factory2.createIdentifier("v")))), 1 /* SingleLine */)
                    ]), factory2.createIfStatement(factory2.createLogicalAnd(factory2.createTypeCheck(factory2.createIdentifier("define"), "function"), factory2.createPropertyAccessExpression(factory2.createIdentifier("define"), "amd")), factory2.createBlock([
                        factory2.createExpressionStatement(factory2.createCallExpression(factory2.createIdentifier("define"), 
                        /*typeArguments*/
                        void 0, [
                            // Add the module name (if provided).
                            ...moduleName ? [moduleName] : [],
                            factory2.createArrayLiteralExpression([
                                factory2.createStringLiteral("require"),
                                factory2.createStringLiteral("exports"),
                                ...aliasedModuleNames,
                                ...unaliasedModuleNames
                            ]),
                            factory2.createIdentifier("factory")
                        ]))
                    ])))
                ], 
                /*multiLine*/
                true), 
                /*location*/
                void 0));
                const updated = factory2.updateSourceFile(node, setTextRange(factory2.createNodeArray([
                    factory2.createExpressionStatement(factory2.createCallExpression(umdHeader, 
                    /*typeArguments*/
                    void 0, [
                        // Add the module body function argument:
                        //
                        //     function (require, exports) ...
                        factory2.createFunctionExpression(
                        /*modifiers*/
                        void 0, 
                        /*asteriskToken*/
                        void 0, 
                        /*name*/
                        void 0, 
                        /*typeParameters*/
                        void 0, [
                            factory2.createParameterDeclaration(
                            /*modifiers*/
                            void 0, 
                            /*dotDotDotToken*/
                            void 0, "require"),
                            factory2.createParameterDeclaration(
                            /*modifiers*/
                            void 0, 
                            /*dotDotDotToken*/
                            void 0, "exports"),
                            ...importAliasNames
                        ], 
                        /*type*/
                        void 0, transformAsynchronousModuleBody(node))
                    ]))
                ]), 
                /*location*/
                node.statements));
                addEmitHelpers(updated, context.readEmitHelpers());
                return updated;
            }