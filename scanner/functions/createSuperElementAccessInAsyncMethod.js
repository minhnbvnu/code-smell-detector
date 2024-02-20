function createSuperElementAccessInAsyncMethod(argumentExpression, location) {
                if (enclosingSuperContainerFlags & 256 /* MethodWithSuperPropertyAssignmentInAsync */) {
                    return setTextRange(factory2.createPropertyAccessExpression(factory2.createCallExpression(factory2.createIdentifier("_superIndex"), 
                    /*typeArguments*/
                    void 0, [argumentExpression]), "value"), location);
                }
                else {
                    return setTextRange(factory2.createCallExpression(factory2.createIdentifier("_superIndex"), 
                    /*typeArguments*/
                    void 0, [argumentExpression]), location);
                }
            }