function convertIterationStatementBodyIfNecessary(node, outermostLabeledStatement, ancestorFacts, convert) {
                if (!shouldConvertIterationStatement(node)) {
                    let saveAllowedNonLabeledJumps;
                    if (convertedLoopState) {
                        saveAllowedNonLabeledJumps = convertedLoopState.allowedNonLabeledJumps;
                        convertedLoopState.allowedNonLabeledJumps = 2 /* Break */ | 4 /* Continue */;
                    }
                    const result = convert ? convert(node, outermostLabeledStatement, 
                    /*convertedLoopBodyStatements*/
                    void 0, ancestorFacts) : factory2.restoreEnclosingLabel(isForStatement(node) ? visitEachChildOfForStatement2(node) : visitEachChild(node, visitor, context), outermostLabeledStatement, convertedLoopState && resetLabel);
                    if (convertedLoopState) {
                        convertedLoopState.allowedNonLabeledJumps = saveAllowedNonLabeledJumps;
                    }
                    return result;
                }
                const currentState = createConvertedLoopState(node);
                const statements = [];
                const outerConvertedLoopState = convertedLoopState;
                convertedLoopState = currentState;
                const initializerFunction = shouldConvertInitializerOfForStatement(node) ? createFunctionForInitializerOfForStatement(node, currentState) : void 0;
                const bodyFunction = shouldConvertBodyOfIterationStatement(node) ? createFunctionForBodyOfIterationStatement(node, currentState, outerConvertedLoopState) : void 0;
                convertedLoopState = outerConvertedLoopState;
                if (initializerFunction)
                    statements.push(initializerFunction.functionDeclaration);
                if (bodyFunction)
                    statements.push(bodyFunction.functionDeclaration);
                addExtraDeclarationsForConvertedLoop(statements, currentState, outerConvertedLoopState);
                if (initializerFunction) {
                    statements.push(generateCallToConvertedLoopInitializer(initializerFunction.functionName, initializerFunction.containsYield));
                }
                let loop;
                if (bodyFunction) {
                    if (convert) {
                        loop = convert(node, outermostLabeledStatement, bodyFunction.part, ancestorFacts);
                    }
                    else {
                        const clone2 = convertIterationStatementCore(node, initializerFunction, factory2.createBlock(bodyFunction.part, 
                        /*multiLine*/
                        true));
                        loop = factory2.restoreEnclosingLabel(clone2, outermostLabeledStatement, convertedLoopState && resetLabel);
                    }
                }
                else {
                    const clone2 = convertIterationStatementCore(node, initializerFunction, Debug.checkDefined(visitNode(node.statement, visitor, isStatement, factory2.liftToBlock)));
                    loop = factory2.restoreEnclosingLabel(clone2, outermostLabeledStatement, convertedLoopState && resetLabel);
                }
                statements.push(loop);
                return statements;
            }