function createSuperAccessVariableStatement(factory2, resolver, node, names) {
            const hasBinding = (resolver.getNodeCheckFlags(node) & 256 /* MethodWithSuperPropertyAssignmentInAsync */) !== 0;
            const accessors = [];
            names.forEach((_, key) => {
                const name = unescapeLeadingUnderscores(key);
                const getterAndSetter = [];
                getterAndSetter.push(factory2.createPropertyAssignment("get", factory2.createArrowFunction(
                /* modifiers */
                void 0, 
                /* typeParameters */
                void 0, 
                /* parameters */
                [], 
                /* type */
                void 0, 
                /* equalsGreaterThanToken */
                void 0, setEmitFlags(factory2.createPropertyAccessExpression(setEmitFlags(factory2.createSuper(), 8 /* NoSubstitution */), name), 8 /* NoSubstitution */))));
                if (hasBinding) {
                    getterAndSetter.push(factory2.createPropertyAssignment("set", factory2.createArrowFunction(
                    /* modifiers */
                    void 0, 
                    /* typeParameters */
                    void 0, 
                    /* parameters */
                    [
                        factory2.createParameterDeclaration(
                        /* modifiers */
                        void 0, 
                        /* dotDotDotToken */
                        void 0, "v", 
                        /* questionToken */
                        void 0, 
                        /* type */
                        void 0, 
                        /* initializer */
                        void 0)
                    ], 
                    /* type */
                    void 0, 
                    /* equalsGreaterThanToken */
                    void 0, factory2.createAssignment(setEmitFlags(factory2.createPropertyAccessExpression(setEmitFlags(factory2.createSuper(), 8 /* NoSubstitution */), name), 8 /* NoSubstitution */), factory2.createIdentifier("v")))));
                }
                accessors.push(factory2.createPropertyAssignment(name, factory2.createObjectLiteralExpression(getterAndSetter)));
            });
            return factory2.createVariableStatement(
            /* modifiers */
            void 0, factory2.createVariableDeclarationList([
                factory2.createVariableDeclaration(factory2.createUniqueName("_super", 16 /* Optimistic */ | 32 /* FileLevel */), 
                /*exclamationToken*/
                void 0, 
                /* type */
                void 0, factory2.createCallExpression(factory2.createPropertyAccessExpression(factory2.createIdentifier("Object"), "create"), 
                /* typeArguments */
                void 0, [
                    factory2.createNull(),
                    factory2.createObjectLiteralExpression(accessors, 
                    /* multiline */
                    true)
                ]))
            ], 2 /* Const */));
        }