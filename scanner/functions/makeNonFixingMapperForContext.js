function makeNonFixingMapperForContext(context) {
                return makeDeferredTypeMapper(map(context.inferences, (i) => i.typeParameter), map(context.inferences, (_, i) => () => {
                    return getInferredType(context, i);
                }));
            }