function createClassFieldDecoratorInitializerMutatorType(thisType, valueType) {
                const thisParam = createParameter("this", thisType);
                const valueParam = createParameter("value", valueType);
                return createFunctionType(
                /*typeParameters*/
                void 0, thisParam, [valueParam], valueType, 
                /*typePredicate*/
                void 0, 1);
            }