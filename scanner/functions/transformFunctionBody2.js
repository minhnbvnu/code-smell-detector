function transformFunctionBody2(node) {
                let multiLine = false;
                let singleLine = false;
                let statementsLocation;
                let closeBraceLocation;
                const prologue = [];
                const statements = [];
                const body = node.body;
                let statementOffset;
                resumeLexicalEnvironment();
                if (isBlock(body)) {
                    statementOffset = factory2.copyStandardPrologue(body.statements, prologue, 0, 
                    /*ensureUseStrict*/
                    false);
                    statementOffset = factory2.copyCustomPrologue(body.statements, statements, statementOffset, visitor, isHoistedFunction);
                    statementOffset = factory2.copyCustomPrologue(body.statements, statements, statementOffset, visitor, isHoistedVariableStatement);
                }
                multiLine = addDefaultValueAssignmentsIfNeeded2(statements, node) || multiLine;
                multiLine = addRestParameterIfNeeded(statements, node, 
                /*inConstructorWithSynthesizedSuper*/
                false) || multiLine;
                if (isBlock(body)) {
                    statementOffset = factory2.copyCustomPrologue(body.statements, statements, statementOffset, visitor);
                    statementsLocation = body.statements;
                    addRange(statements, visitNodes2(body.statements, visitor, isStatement, statementOffset));
                    if (!multiLine && body.multiLine) {
                        multiLine = true;
                    }
                }
                else {
                    Debug.assert(node.kind === 216 /* ArrowFunction */);
                    statementsLocation = moveRangeEnd(body, -1);
                    const equalsGreaterThanToken = node.equalsGreaterThanToken;
                    if (!nodeIsSynthesized(equalsGreaterThanToken) && !nodeIsSynthesized(body)) {
                        if (rangeEndIsOnSameLineAsRangeStart(equalsGreaterThanToken, body, currentSourceFile)) {
                            singleLine = true;
                        }
                        else {
                            multiLine = true;
                        }
                    }
                    const expression = visitNode(body, visitor, isExpression);
                    const returnStatement = factory2.createReturnStatement(expression);
                    setTextRange(returnStatement, body);
                    moveSyntheticComments(returnStatement, body);
                    setEmitFlags(returnStatement, 768 /* NoTokenSourceMaps */ | 64 /* NoTrailingSourceMap */ | 2048 /* NoTrailingComments */);
                    statements.push(returnStatement);
                    closeBraceLocation = body;
                }
                factory2.mergeLexicalEnvironment(prologue, endLexicalEnvironment());
                insertCaptureNewTargetIfNeeded(prologue, node, 
                /*copyOnWrite*/
                false);
                insertCaptureThisForNodeIfNeeded(prologue, node);
                if (some(prologue)) {
                    multiLine = true;
                }
                statements.unshift(...prologue);
                if (isBlock(body) && arrayIsEqualTo(statements, body.statements)) {
                    return body;
                }
                const block = factory2.createBlock(setTextRange(factory2.createNodeArray(statements), statementsLocation), multiLine);
                setTextRange(block, node.body);
                if (!multiLine && singleLine) {
                    setEmitFlags(block, 1 /* SingleLine */);
                }
                if (closeBraceLocation) {
                    setTokenSourceMapRange(block, 19 /* CloseBraceToken */, closeBraceLocation);
                }
                setOriginalNode(block, node.body);
                return block;
            }