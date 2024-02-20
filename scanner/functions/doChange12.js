function doChange12(changes, sourceFile, ctr) {
            const superCall = factory.createExpressionStatement(factory.createCallExpression(factory.createSuper(), 
            /*typeArguments*/
            void 0, 
            /*argumentsArray*/
            emptyArray));
            changes.insertNodeAtConstructorStart(sourceFile, ctr, superCall);
        }