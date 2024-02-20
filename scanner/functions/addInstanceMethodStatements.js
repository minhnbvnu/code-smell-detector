function addInstanceMethodStatements(statements, methods, receiver) {
                if (!shouldTransformPrivateElementsOrClassStaticBlocks || !some(methods)) {
                    return;
                }
                const { weakSetName } = getPrivateIdentifierEnvironment().data;
                Debug.assert(weakSetName, "weakSetName should be set in private identifier environment");
                statements.push(factory2.createExpressionStatement(createPrivateInstanceMethodInitializer(receiver, weakSetName)));
            }