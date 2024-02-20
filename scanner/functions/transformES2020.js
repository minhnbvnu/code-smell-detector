function transformES2020(context) {
            const { factory: factory2, hoistVariableDeclaration } = context;
            return chainBundle(context, transformSourceFile);
            function transformSourceFile(node) {
                if (node.isDeclarationFile) {
                    return node;
                }
                return visitEachChild(node, visitor, context);
            }
            function visitor(node) {
                if ((node.transformFlags & 32 /* ContainsES2020 */) === 0) {
                    return node;
                }
                switch (node.kind) {
                    case 210 /* CallExpression */: {
                        const updated = visitNonOptionalCallExpression(node, 
                        /*captureThisArg*/
                        false);
                        Debug.assertNotNode(updated, isSyntheticReference);
                        return updated;
                    }
                    case 208 /* PropertyAccessExpression */:
                    case 209 /* ElementAccessExpression */:
                        if (isOptionalChain(node)) {
                            const updated = visitOptionalExpression(node, 
                            /*captureThisArg*/
                            false, 
                            /*isDelete*/
                            false);
                            Debug.assertNotNode(updated, isSyntheticReference);
                            return updated;
                        }
                        return visitEachChild(node, visitor, context);
                    case 223 /* BinaryExpression */:
                        if (node.operatorToken.kind === 60 /* QuestionQuestionToken */) {
                            return transformNullishCoalescingExpression(node);
                        }
                        return visitEachChild(node, visitor, context);
                    case 217 /* DeleteExpression */:
                        return visitDeleteExpression(node);
                    default:
                        return visitEachChild(node, visitor, context);
                }
            }
            function flattenChain(chain) {
                Debug.assertNotNode(chain, isNonNullChain);
                const links = [chain];
                while (!chain.questionDotToken && !isTaggedTemplateExpression(chain)) {
                    chain = cast(skipPartiallyEmittedExpressions(chain.expression), isOptionalChain);
                    Debug.assertNotNode(chain, isNonNullChain);
                    links.unshift(chain);
                }
                return { expression: chain.expression, chain: links };
            }
            function visitNonOptionalParenthesizedExpression(node, captureThisArg, isDelete) {
                const expression = visitNonOptionalExpression(node.expression, captureThisArg, isDelete);
                if (isSyntheticReference(expression)) {
                    return factory2.createSyntheticReferenceExpression(factory2.updateParenthesizedExpression(node, expression.expression), expression.thisArg);
                }
                return factory2.updateParenthesizedExpression(node, expression);
            }
            function visitNonOptionalPropertyOrElementAccessExpression(node, captureThisArg, isDelete) {
                if (isOptionalChain(node)) {
                    return visitOptionalExpression(node, captureThisArg, isDelete);
                }
                let expression = visitNode(node.expression, visitor, isExpression);
                Debug.assertNotNode(expression, isSyntheticReference);
                let thisArg;
                if (captureThisArg) {
                    if (!isSimpleCopiableExpression(expression)) {
                        thisArg = factory2.createTempVariable(hoistVariableDeclaration);
                        expression = factory2.createAssignment(thisArg, expression);
                    }
                    else {
                        thisArg = expression;
                    }
                }
                expression = node.kind === 208 /* PropertyAccessExpression */ ? factory2.updatePropertyAccessExpression(node, expression, visitNode(node.name, visitor, isIdentifier)) : factory2.updateElementAccessExpression(node, expression, visitNode(node.argumentExpression, visitor, isExpression));
                return thisArg ? factory2.createSyntheticReferenceExpression(expression, thisArg) : expression;
            }
            function visitNonOptionalCallExpression(node, captureThisArg) {
                if (isOptionalChain(node)) {
                    return visitOptionalExpression(node, captureThisArg, 
                    /*isDelete*/
                    false);
                }
                if (isParenthesizedExpression(node.expression) && isOptionalChain(skipParentheses(node.expression))) {
                    const expression = visitNonOptionalParenthesizedExpression(node.expression, 
                    /*captureThisArg*/
                    true, 
                    /*isDelete*/
                    false);
                    const args = visitNodes2(node.arguments, visitor, isExpression);
                    if (isSyntheticReference(expression)) {
                        return setTextRange(factory2.createFunctionCallCall(expression.expression, expression.thisArg, args), node);
                    }
                    return factory2.updateCallExpression(node, expression, 
                    /*typeArguments*/
                    void 0, args);
                }
                return visitEachChild(node, visitor, context);
            }
            function visitNonOptionalExpression(node, captureThisArg, isDelete) {
                switch (node.kind) {
                    case 214 /* ParenthesizedExpression */:
                        return visitNonOptionalParenthesizedExpression(node, captureThisArg, isDelete);
                    case 208 /* PropertyAccessExpression */:
                    case 209 /* ElementAccessExpression */:
                        return visitNonOptionalPropertyOrElementAccessExpression(node, captureThisArg, isDelete);
                    case 210 /* CallExpression */:
                        return visitNonOptionalCallExpression(node, captureThisArg);
                    default:
                        return visitNode(node, visitor, isExpression);
                }
            }
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
            function createNotNullCondition(left, right, invert) {
                return factory2.createBinaryExpression(factory2.createBinaryExpression(left, factory2.createToken(invert ? 36 /* EqualsEqualsEqualsToken */ : 37 /* ExclamationEqualsEqualsToken */), factory2.createNull()), factory2.createToken(invert ? 56 /* BarBarToken */ : 55 /* AmpersandAmpersandToken */), factory2.createBinaryExpression(right, factory2.createToken(invert ? 36 /* EqualsEqualsEqualsToken */ : 37 /* ExclamationEqualsEqualsToken */), factory2.createVoidZero()));
            }
            function transformNullishCoalescingExpression(node) {
                let left = visitNode(node.left, visitor, isExpression);
                let right = left;
                if (!isSimpleCopiableExpression(left)) {
                    right = factory2.createTempVariable(hoistVariableDeclaration);
                    left = factory2.createAssignment(right, left);
                }
                return setTextRange(factory2.createConditionalExpression(createNotNullCondition(left, right), 
                /*questionToken*/
                void 0, right, 
                /*colonToken*/
                void 0, visitNode(node.right, visitor, isExpression)), node);
            }
            function visitDeleteExpression(node) {
                return isOptionalChain(skipParentheses(node.expression)) ? setOriginalNode(visitNonOptionalExpression(node.expression, 
                /*captureThisArg*/
                false, 
                /*isDelete*/
                true), node) : factory2.updateDeleteExpression(node, visitNode(node.expression, visitor, isExpression));
            }
        }