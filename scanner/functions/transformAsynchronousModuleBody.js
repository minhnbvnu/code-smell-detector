function transformAsynchronousModuleBody(node) {
                startLexicalEnvironment();
                const statements = [];
                const statementOffset = factory2.copyPrologue(node.statements, statements, 
                /*ensureUseStrict*/
                !compilerOptions.noImplicitUseStrict, topLevelVisitor);
                if (shouldEmitUnderscoreUnderscoreESModule()) {
                    append(statements, createUnderscoreUnderscoreESModule());
                }
                if (length(currentModuleInfo.exportedNames)) {
                    append(statements, factory2.createExpressionStatement(reduceLeft(currentModuleInfo.exportedNames, (prev, nextId) => factory2.createAssignment(factory2.createPropertyAccessExpression(factory2.createIdentifier("exports"), factory2.createIdentifier(idText(nextId))), prev), factory2.createVoidZero())));
                }
                append(statements, visitNode(currentModuleInfo.externalHelpersImportDeclaration, topLevelVisitor, isStatement));
                if (moduleKind === 2 /* AMD */) {
                    addRange(statements, mapDefined(currentModuleInfo.externalImports, getAMDImportExpressionForImport));
                }
                addRange(statements, visitNodes2(node.statements, topLevelVisitor, isStatement, statementOffset));
                addExportEqualsIfNeeded(statements, 
                /*emitAsReturn*/
                true);
                insertStatementsAfterStandardPrologue(statements, endLexicalEnvironment());
                const body = factory2.createBlock(statements, 
                /*multiLine*/
                true);
                if (needUMDDynamicImportHelper) {
                    addEmitHelper(body, dynamicImportUMDHelper);
                }
                return body;
            }