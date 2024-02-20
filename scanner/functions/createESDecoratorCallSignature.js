function createESDecoratorCallSignature(targetType, contextType, nonOptionalReturnType) {
                const targetParam = createParameter("target", targetType);
                const contextParam = createParameter("context", contextType);
                const returnType = getUnionType([nonOptionalReturnType, voidType]);
                return createCallSignature(
                /*typeParameters*/
                void 0, 
                /*thisParameter*/
                void 0, [targetParam, contextParam], returnType);
            }