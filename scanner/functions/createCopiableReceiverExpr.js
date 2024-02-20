function createCopiableReceiverExpr(receiver) {
                const clone2 = nodeIsSynthesized(receiver) ? receiver : factory2.cloneNode(receiver);
                if (isSimpleInlineableExpression(receiver)) {
                    return { readExpression: clone2, initializeExpression: void 0 };
                }
                const readExpression = factory2.createTempVariable(hoistVariableDeclaration);
                const initializeExpression = factory2.createAssignment(readExpression, clone2);
                return { readExpression, initializeExpression };
            }