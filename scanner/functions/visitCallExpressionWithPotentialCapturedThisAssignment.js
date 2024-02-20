function visitCallExpressionWithPotentialCapturedThisAssignment(node, assignToCapturedThis) {
                if (node.transformFlags & 32768 /* ContainsRestOrSpread */ || node.expression.kind === 106 /* SuperKeyword */ || isSuperProperty(skipOuterExpressions(node.expression))) {
                    const { target, thisArg } = factory2.createCallBinding(node.expression, hoistVariableDeclaration);
                    if (node.expression.kind === 106 /* SuperKeyword */) {
                        setEmitFlags(thisArg, 8 /* NoSubstitution */);
                    }
                    let resultingCall;
                    if (node.transformFlags & 32768 /* ContainsRestOrSpread */) {
                        resultingCall = factory2.createFunctionApplyCall(Debug.checkDefined(visitNode(target, callExpressionVisitor, isExpression)), node.expression.kind === 106 /* SuperKeyword */ ? thisArg : Debug.checkDefined(visitNode(thisArg, visitor, isExpression)), transformAndSpreadElements(node.arguments, 
                        /*isArgumentList*/
                        true, 
                        /*multiLine*/
                        false, 
                        /*hasTrailingComma*/
                        false));
                    }
                    else {
                        resultingCall = setTextRange(factory2.createFunctionCallCall(Debug.checkDefined(visitNode(target, callExpressionVisitor, isExpression)), node.expression.kind === 106 /* SuperKeyword */ ? thisArg : Debug.checkDefined(visitNode(thisArg, visitor, isExpression)), visitNodes2(node.arguments, visitor, isExpression)), node);
                    }
                    if (node.expression.kind === 106 /* SuperKeyword */) {
                        const initializer = factory2.createLogicalOr(resultingCall, createActualThis());
                        resultingCall = assignToCapturedThis ? factory2.createAssignment(factory2.createUniqueName("_this", 16 /* Optimistic */ | 32 /* FileLevel */), initializer) : initializer;
                    }
                    return setOriginalNode(resultingCall, node);
                }
                return visitEachChild(node, visitor, context);
            }