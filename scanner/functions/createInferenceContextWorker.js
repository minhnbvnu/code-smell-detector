function createInferenceContextWorker(inferences, signature, flags, compareTypes) {
                const context = {
                    inferences,
                    signature,
                    flags,
                    compareTypes,
                    mapper: reportUnmeasurableMapper,
                    // initialize to a noop mapper so the context object is available, but the underlying object shape is right upon construction
                    nonFixingMapper: reportUnmeasurableMapper
                };
                context.mapper = makeFixingMapperForContext(context);
                context.nonFixingMapper = makeNonFixingMapperForContext(context);
                return context;
            }