function createUnderscoreUnderscoreESModule() {
                let statement;
                if (languageVersion === 0 /* ES3 */) {
                    statement = factory2.createExpressionStatement(createExportExpression(factory2.createIdentifier("__esModule"), factory2.createTrue()));
                }
                else {
                    statement = factory2.createExpressionStatement(factory2.createCallExpression(factory2.createPropertyAccessExpression(factory2.createIdentifier("Object"), "defineProperty"), 
                    /*typeArguments*/
                    void 0, [
                        factory2.createIdentifier("exports"),
                        factory2.createStringLiteral("__esModule"),
                        factory2.createObjectLiteralExpression([
                            factory2.createPropertyAssignment("value", factory2.createTrue())
                        ])
                    ]));
                }
                setEmitFlags(statement, 2097152 /* CustomPrologue */);
                return statement;
            }