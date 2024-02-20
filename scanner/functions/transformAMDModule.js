function transformAMDModule(node) {
                const define = factory2.createIdentifier("define");
                const moduleName = tryGetModuleNameFromFile(factory2, node, host, compilerOptions);
                const jsonSourceFile = isJsonSourceFile(node) && node;
                const { aliasedModuleNames, unaliasedModuleNames, importAliasNames } = collectAsynchronousDependencies(node, 
                /*includeNonAmdDependencies*/
                true);
                const updated = factory2.updateSourceFile(node, setTextRange(factory2.createNodeArray([
                    factory2.createExpressionStatement(factory2.createCallExpression(define, 
                    /*typeArguments*/
                    void 0, [
                        // Add the module name (if provided).
                        ...moduleName ? [moduleName] : [],
                        // Add the dependency array argument:
                        //
                        //     ["require", "exports", module1", "module2", ...]
                        factory2.createArrayLiteralExpression(jsonSourceFile ? emptyArray : [
                            factory2.createStringLiteral("require"),
                            factory2.createStringLiteral("exports"),
                            ...aliasedModuleNames,
                            ...unaliasedModuleNames
                        ]),
                        // Add the module body function argument:
                        //
                        //     function (require, exports, module1, module2) ...
                        jsonSourceFile ? jsonSourceFile.statements.length ? jsonSourceFile.statements[0].expression : factory2.createObjectLiteralExpression() : factory2.createFunctionExpression(
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