function createESDecorateHelper(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
                context.requestEmitHelper(esDecorateHelper);
                return factory2.createCallExpression(getUnscopedHelperName("__esDecorate"), 
                /*typeArguments*/
                void 0, [
                    ctor != null ? ctor : factory2.createNull(),
                    descriptorIn != null ? descriptorIn : factory2.createNull(),
                    decorators,
                    createESDecorateContextObject(contextIn),
                    initializers,
                    extraInitializers
                ]);
            }