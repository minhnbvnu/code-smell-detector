function createBrandCheckWeakSetForPrivateMethods() {
                const { weakSetName } = getPrivateIdentifierEnvironment().data;
                Debug.assert(weakSetName, "weakSetName should be set in private identifier environment");
                getPendingExpressions().push(factory2.createAssignment(weakSetName, factory2.createNewExpression(factory2.createIdentifier("WeakSet"), 
                /*typeArguments*/
                void 0, [])));
            }