function createExtendsHelper(name) {
                context.requestEmitHelper(extendsHelper);
                return factory2.createCallExpression(getUnscopedHelperName("__extends"), 
                /*typeArguments*/
                void 0, [name, factory2.createUniqueName("_super", 16 /* Optimistic */ | 32 /* FileLevel */)]);
            }