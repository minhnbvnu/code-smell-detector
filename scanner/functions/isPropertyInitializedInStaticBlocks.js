function isPropertyInitializedInStaticBlocks(propName, propType, staticBlocks, startPos, endPos) {
                for (const staticBlock of staticBlocks) {
                    if (staticBlock.pos >= startPos && staticBlock.pos <= endPos) {
                        const reference = factory.createPropertyAccessExpression(factory.createThis(), propName);
                        setParent(reference.expression, reference);
                        setParent(reference, staticBlock);
                        reference.flowNode = staticBlock.returnFlowNode;
                        const flowType = getFlowTypeOfReference(reference, propType, getOptionalType(propType));
                        if (!containsUndefinedType(flowType)) {
                            return true;
                        }
                    }
                }
                return false;
            }