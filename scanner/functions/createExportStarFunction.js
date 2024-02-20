function createExportStarFunction(localNames) {
                const exportStarFunction = factory2.createUniqueName("exportStar");
                const m = factory2.createIdentifier("m");
                const n = factory2.createIdentifier("n");
                const exports = factory2.createIdentifier("exports");
                let condition = factory2.createStrictInequality(n, factory2.createStringLiteral("default"));
                if (localNames) {
                    condition = factory2.createLogicalAnd(condition, factory2.createLogicalNot(factory2.createCallExpression(factory2.createPropertyAccessExpression(localNames, "hasOwnProperty"), 
                    /*typeArguments*/
                    void 0, [n])));
                }
                return factory2.createFunctionDeclaration(
                /*modifiers*/
                void 0, 
                /*asteriskToken*/
                void 0, exportStarFunction, 
                /*typeParameters*/
                void 0, [factory2.createParameterDeclaration(
                    /*modifiers*/
                    void 0, 
                    /*dotDotDotToken*/
                    void 0, m)], 
                /*type*/
                void 0, factory2.createBlock([
                    factory2.createVariableStatement(
                    /*modifiers*/
                    void 0, factory2.createVariableDeclarationList([
                        factory2.createVariableDeclaration(exports, 
                        /*exclamationToken*/
                        void 0, 
                        /*type*/
                        void 0, factory2.createObjectLiteralExpression([]))
                    ])),
                    factory2.createForInStatement(factory2.createVariableDeclarationList([
                        factory2.createVariableDeclaration(n)
                    ]), m, factory2.createBlock([
                        setEmitFlags(factory2.createIfStatement(condition, factory2.createExpressionStatement(factory2.createAssignment(factory2.createElementAccessExpression(exports, n), factory2.createElementAccessExpression(m, n)))), 1 /* SingleLine */)
                    ])),
                    factory2.createExpressionStatement(factory2.createCallExpression(exportFunction, 
                    /*typeArguments*/
                    void 0, [exports]))
                ], 
                /*multiline*/
                true));
            }