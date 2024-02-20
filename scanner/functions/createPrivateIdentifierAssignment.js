function createPrivateIdentifierAssignment(info, receiver, right, operator) {
                receiver = visitNode(receiver, visitor, isExpression);
                right = visitNode(right, visitor, isExpression);
                if (isCompoundAssignment(operator)) {
                    const { readExpression, initializeExpression } = createCopiableReceiverExpr(receiver);
                    receiver = initializeExpression || readExpression;
                    right = factory2.createBinaryExpression(createPrivateIdentifierAccessHelper(info, readExpression), getNonAssignmentOperatorForCompoundAssignment(operator), right);
                }
                setCommentRange(receiver, moveRangePos(receiver, -1));
                switch (info.kind) {
                    case "a" /* Accessor */:
                        return emitHelpers().createClassPrivateFieldSetHelper(receiver, info.brandCheckIdentifier, right, info.kind, info.setterName);
                    case "m" /* Method */:
                        return emitHelpers().createClassPrivateFieldSetHelper(receiver, info.brandCheckIdentifier, right, info.kind, 
                        /* f */
                        void 0);
                    case "f" /* Field */:
                        return emitHelpers().createClassPrivateFieldSetHelper(receiver, info.brandCheckIdentifier, right, info.kind, info.isStatic ? info.variableName : void 0);
                    case "untransformed":
                        return Debug.fail("Access helpers should not be created for untransformed private elements");
                    default:
                        Debug.assertNever(info, "Unknown private element type");
                }
            }