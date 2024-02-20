function checkReturn(returnNode, reportingNode = returnNode) {
                const tsNode = esTreeNodeToTSNodeMap.get(returnNode);
                const anyType = util.isAnyOrAnyArrayTypeDiscriminated(tsNode, checker);
                const functionNode = getParentFunctionNode(returnNode);
                /* istanbul ignore if */ if (!functionNode) {
                    return;
                }
                // function has an explicit return type, so ensure it's a safe return
                const returnNodeType = util.getConstrainedTypeAtLocation(checker, esTreeNodeToTSNodeMap.get(returnNode));
                const functionTSNode = esTreeNodeToTSNodeMap.get(functionNode);
                // function expressions will not have their return type modified based on receiver typing
                // so we have to use the contextual typing in these cases, i.e.
                // const foo1: () => Set<string> = () => new Set<any>();
                // the return type of the arrow function is Set<any> even though the variable is typed as Set<string>
                let functionType = tsutils.isExpression(functionTSNode)
                    ? util.getContextualType(checker, functionTSNode)
                    : checker.getTypeAtLocation(functionTSNode);
                if (!functionType) {
                    functionType = checker.getTypeAtLocation(functionTSNode);
                }
                // If there is an explicit type annotation *and* that type matches the actual
                // function return type, we shouldn't complain (it's intentional, even if unsafe)
                if (functionTSNode.type) {
                    for (const signature of functionType.getCallSignatures()) {
                        if (returnNodeType === signature.getReturnType()) {
                            return;
                        }
                    }
                }
                if (anyType !== util.AnyType.Safe) {
                    // Allow cases when the declared return type of the function is either unknown or unknown[]
                    // and the function is returning any or any[].
                    for (const signature of functionType.getCallSignatures()) {
                        const functionReturnType = signature.getReturnType();
                        if (anyType === util.AnyType.Any &&
                            util.isTypeUnknownType(functionReturnType)) {
                            return;
                        }
                        if (anyType === util.AnyType.AnyArray &&
                            util.isTypeUnknownArrayType(functionReturnType, checker)) {
                            return;
                        }
                    }
                    let messageId = 'unsafeReturn';
                    if (!isNoImplicitThis) {
                        // `return this`
                        const thisExpression = (0, util_1.getThisExpression)(returnNode);
                        if (thisExpression &&
                            util.isTypeAnyType(util.getConstrainedTypeAtLocation(checker, esTreeNodeToTSNodeMap.get(thisExpression)))) {
                            messageId = 'unsafeReturnThis';
                        }
                    }
                    // If the function return type was not unknown/unknown[], mark usage as unsafeReturn.
                    return context.report({
                        node: reportingNode,
                        messageId,
                        data: {
                            type: anyType === util.AnyType.Any ? 'any' : 'any[]',
                        },
                    });
                }
                for (const signature of functionType.getCallSignatures()) {
                    const functionReturnType = signature.getReturnType();
                    const result = util.isUnsafeAssignment(returnNodeType, functionReturnType, checker, returnNode);
                    if (!result) {
                        return;
                    }
                    const { sender, receiver } = result;
                    return context.report({
                        node: reportingNode,
                        messageId: 'unsafeReturnAssignment',
                        data: {
                            sender: checker.typeToString(sender),
                            receiver: checker.typeToString(receiver),
                        },
                    });
                }
            }