function createClassPrivateFieldSetHelper(receiver, state, value, kind, f) {
                context.requestEmitHelper(classPrivateFieldSetHelper);
                let args;
                if (!f) {
                    args = [receiver, state, value, factory2.createStringLiteral(kind)];
                }
                else {
                    args = [receiver, state, value, factory2.createStringLiteral(kind), f];
                }
                return factory2.createCallExpression(getUnscopedHelperName("__classPrivateFieldSet"), 
                /*typeArguments*/
                void 0, args);
            }