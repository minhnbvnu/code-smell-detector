function makeFixingMapperForContext(context) {
                return makeDeferredTypeMapper(map(context.inferences, (i) => i.typeParameter), map(context.inferences, (inference, i) => () => {
                    if (!inference.isFixed) {
                        inferFromIntraExpressionSites(context);
                        clearCachedInferences(context.inferences);
                        inference.isFixed = true;
                    }
                    return getInferredType(context, i);
                }));
            }