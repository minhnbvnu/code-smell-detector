function createSystemModuleBody(node, dependencyGroups) {
                const statements = [];
                startLexicalEnvironment();
                const ensureUseStrict = getStrictOptionValue(compilerOptions, "alwaysStrict") || !compilerOptions.noImplicitUseStrict && isExternalModule(currentSourceFile);
                const statementOffset = factory2.copyPrologue(node.statements, statements, ensureUseStrict, topLevelVisitor);
                statements.push(factory2.createVariableStatement(
                /*modifiers*/
                void 0, factory2.createVariableDeclarationList([
                    factory2.createVariableDeclaration("__moduleName", 
                    /*exclamationToken*/
                    void 0, 
                    /*type*/
                    void 0, factory2.createLogicalAnd(contextObject, factory2.createPropertyAccessExpression(contextObject, "id")))
                ])));
                visitNode(moduleInfo.externalHelpersImportDeclaration, topLevelVisitor, isStatement);
                const executeStatements = visitNodes2(node.statements, topLevelVisitor, isStatement, statementOffset);
                addRange(statements, hoistedStatements);
                insertStatementsAfterStandardPrologue(statements, endLexicalEnvironment());
                const exportStarFunction = addExportStarIfNeeded(statements);
                const modifiers = node.transformFlags & 2097152 /* ContainsAwait */ ? factory2.createModifiersFromModifierFlags(512 /* Async */) : void 0;
                const moduleObject = factory2.createObjectLiteralExpression([
                    factory2.createPropertyAssignment("setters", createSettersArray(exportStarFunction, dependencyGroups)),
                    factory2.createPropertyAssignment("execute", factory2.createFunctionExpression(modifiers, 
                    /*asteriskToken*/
                    void 0, 
                    /*name*/
                    void 0, 
                    /*typeParameters*/
                    void 0, 
                    /*parameters*/
                    [], 
                    /*type*/
                    void 0, factory2.createBlock(executeStatements, 
                    /*multiLine*/
                    true)))
                ], 
                /*multiLine*/
                true);
                statements.push(factory2.createReturnStatement(moduleObject));
                return factory2.createBlock(statements, 
                /*multiLine*/
                true);
            }