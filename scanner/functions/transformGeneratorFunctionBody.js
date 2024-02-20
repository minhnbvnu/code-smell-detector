function transformGeneratorFunctionBody(body) {
                const statements2 = [];
                const savedInGeneratorFunctionBody = inGeneratorFunctionBody;
                const savedInStatementContainingYield = inStatementContainingYield;
                const savedBlocks = blocks;
                const savedBlockOffsets = blockOffsets;
                const savedBlockActions = blockActions;
                const savedBlockStack = blockStack;
                const savedLabelOffsets = labelOffsets;
                const savedLabelExpressions = labelExpressions;
                const savedNextLabelId = nextLabelId;
                const savedOperations = operations;
                const savedOperationArguments = operationArguments;
                const savedOperationLocations = operationLocations;
                const savedState = state;
                inGeneratorFunctionBody = true;
                inStatementContainingYield = false;
                blocks = void 0;
                blockOffsets = void 0;
                blockActions = void 0;
                blockStack = void 0;
                labelOffsets = void 0;
                labelExpressions = void 0;
                nextLabelId = 1;
                operations = void 0;
                operationArguments = void 0;
                operationLocations = void 0;
                state = factory2.createTempVariable(
                /*recordTempVariable*/
                void 0);
                resumeLexicalEnvironment();
                const statementOffset = factory2.copyPrologue(body.statements, statements2, 
                /*ensureUseStrict*/
                false, visitor);
                transformAndEmitStatements(body.statements, statementOffset);
                const buildResult = build2();
                insertStatementsAfterStandardPrologue(statements2, endLexicalEnvironment());
                statements2.push(factory2.createReturnStatement(buildResult));
                inGeneratorFunctionBody = savedInGeneratorFunctionBody;
                inStatementContainingYield = savedInStatementContainingYield;
                blocks = savedBlocks;
                blockOffsets = savedBlockOffsets;
                blockActions = savedBlockActions;
                blockStack = savedBlockStack;
                labelOffsets = savedLabelOffsets;
                labelExpressions = savedLabelExpressions;
                nextLabelId = savedNextLabelId;
                operations = savedOperations;
                operationArguments = savedOperationArguments;
                operationLocations = savedOperationLocations;
                state = savedState;
                return setTextRange(factory2.createBlock(statements2, body.multiLine), body);
            }