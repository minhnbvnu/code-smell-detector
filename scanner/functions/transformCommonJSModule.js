function transformCommonJSModule(node) {
                startLexicalEnvironment();
                const statements = [];
                const ensureUseStrict = getStrictOptionValue(compilerOptions, "alwaysStrict") || !compilerOptions.noImplicitUseStrict && isExternalModule(currentSourceFile);
                const statementOffset = factory2.copyPrologue(node.statements, statements, ensureUseStrict && !isJsonSourceFile(node), topLevelVisitor);
                if (shouldEmitUnderscoreUnderscoreESModule()) {
                    append(statements, createUnderscoreUnderscoreESModule());
                }
                if (length(currentModuleInfo.exportedNames)) {
                    const chunkSize = 50;
                    for (let i = 0; i < currentModuleInfo.exportedNames.length; i += chunkSize) {
                        append(statements, factory2.createExpressionStatement(reduceLeft(currentModuleInfo.exportedNames.slice(i, i + chunkSize), (prev, nextId) => factory2.createAssignment(factory2.createPropertyAccessExpression(factory2.createIdentifier("exports"), factory2.createIdentifier(idText(nextId))), prev), factory2.createVoidZero())));
                    }
                }
                append(statements, visitNode(currentModuleInfo.externalHelpersImportDeclaration, topLevelVisitor, isStatement));
                addRange(statements, visitNodes2(node.statements, topLevelVisitor, isStatement, statementOffset));
                addExportEqualsIfNeeded(statements, 
                /*emitAsReturn*/
                false);
                insertStatementsAfterStandardPrologue(statements, endLexicalEnvironment());
                const updated = factory2.updateSourceFile(node, setTextRange(factory2.createNodeArray(statements), node.statements));
                addEmitHelpers(updated, context.readEmitHelpers());
                return updated;
            }