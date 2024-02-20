function visitOptionalExpression(node, captureThisArg, isDelete) {
                const { expression, chain } = flattenChain(node);
                const left = visitNonOptionalExpression(skipPartiallyEmittedExpressions(expression), isCallChain(chain[0]), 
                /*isDelete*/
                false);
                let leftThisArg = isSyntheticReference(left) ? left.thisArg : void 0;
                let capturedLeft = isSyntheticReference(left) ? left.expression : left;
                let leftExpression = factory2.restoreOuterExpressions(expression, capturedLeft, 8 /* PartiallyEmittedExpressions */);
                if (!isSimpleCopiableExpression(capturedLeft)) {
                    capturedLeft = factory2.createTempVariable(hoistVariableDeclaration);
                    leftExpression = factory2.createAssignment(capturedLeft, leftExpression);
                }
                let rightExpression = capturedLeft;
                let thisArg;
                for (let i = 0; i < chain.length; i++) {
                    const segment = chain[i];
                    switch (segment.kind) {
                        case 208 /* PropertyAccessExpression */:
                        case 209 /* ElementAccessExpression */:
                            if (i === chain.length - 1 && captureThisArg) {
                                if (!isSimpleCopiableExpression(rightExpression)) {
                                    thisArg = factory2.createTempVariable(hoistVariableDeclaration);
                                    rightExpression = factory2.createAssignment(thisArg, rightExpression);
                                }
                                else {
                                    thisArg = rightExpression;
                                }
                            }
                            rightExpression = segment.kind === 208 /* PropertyAccessExpression */ ? factory2.createPropertyAccessExpression(rightExpression, visitNode(segment.name, visitor, isIdentifier)) : factory2.createElementAccessExpression(rightExpression, visitNode(segment.argumentExpression, visitor, isExpression));
                            break;
                        case 210 /* CallExpression */:
                            if (i === 0 && leftThisArg) {
                                if (!isGeneratedIdentifier(leftThisArg)) {
                                    leftThisArg = factory2.cloneNode(leftThisArg);
                                    addEmitFlags(leftThisArg, 3072 /* NoComments */);
                                }
                                rightExpression = factory2.createFunctionCallCall(rightExpression, leftThisArg.kind === 106 /* SuperKeyword */ ? factory2.createThis() : leftThisArg, visitNodes2(segment.arguments, visitor, isExpression));
                            }
                            else {
                                rightExpression = factory2.createCallExpression(rightExpression, 
                                /*typeArguments*/
                                void 0, visitNodes2(segment.arguments, visitor, isExpression));
                            }
                            break;
                    }
                    setOriginalNode(rightExpression, segment);
                }
                const target = isDelete ? factory2.createConditionalExpression(createNotNullCondition(leftExpression, capturedLeft, 
                /*invert*/
                true), 
                /*questionToken*/
                void 0, factory2.createTrue(), 
                /*colonToken*/
                void 0, factory2.createDeleteExpression(rightExpression)) : factory2.createConditionalExpression(createNotNullCondition(leftExpression, capturedLeft, 
                /*invert*/
                true), 
                /*questionToken*/
                void 0, factory2.createVoidZero(), 
                /*colonToken*/
                void 0, rightExpression);
                setTextRange(target, node);
                return thisArg ? factory2.createSyntheticReferenceExpression(target, thisArg) : target;
            }