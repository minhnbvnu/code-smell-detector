function createPrivateIdentifierAccessHelper(info, receiver) {
                setCommentRange(receiver, moveRangePos(receiver, -1));
                switch (info.kind) {
                    case "a" /* Accessor */:
                        return emitHelpers().createClassPrivateFieldGetHelper(receiver, info.brandCheckIdentifier, info.kind, info.getterName);
                    case "m" /* Method */:
                        return emitHelpers().createClassPrivateFieldGetHelper(receiver, info.brandCheckIdentifier, info.kind, info.methodName);
                    case "f" /* Field */:
                        return emitHelpers().createClassPrivateFieldGetHelper(receiver, info.brandCheckIdentifier, info.kind, info.isStatic ? info.variableName : void 0);
                    case "untransformed":
                        return Debug.fail("Access helpers should not be created for untransformed private elements");
                    default:
                        Debug.assertNever(info, "Unknown private element type");
                }
            }