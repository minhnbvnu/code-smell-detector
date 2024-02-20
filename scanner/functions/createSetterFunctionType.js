function createSetterFunctionType(type) {
                const valueParam = createParameter("value", type);
                return createFunctionType(
                /*typeParameters*/
                void 0, 
                /*thisParameter*/
                void 0, [valueParam], voidType);
            }