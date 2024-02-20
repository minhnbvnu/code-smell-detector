function serializeBaseType(t, staticType, rootName) {
                        const ref = trySerializeAsTypeReference(t, 111551 /* Value */);
                        if (ref) {
                            return ref;
                        }
                        const tempName = getUnusedName(`${rootName}_base`);
                        const statement = factory.createVariableStatement(
                        /*modifiers*/
                        void 0, factory.createVariableDeclarationList([
                            factory.createVariableDeclaration(tempName, 
                            /*exclamationToken*/
                            void 0, typeToTypeNodeHelper(staticType, context))
                        ], 2 /* Const */));
                        addResult(statement, 0 /* None */);
                        return factory.createExpressionWithTypeArguments(factory.createIdentifier(tempName), 
                        /*typeArgs*/
                        void 0);
                    }