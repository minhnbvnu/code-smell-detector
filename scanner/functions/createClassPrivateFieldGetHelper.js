function createClassPrivateFieldGetHelper(receiver, state, kind, f) {
                context.requestEmitHelper(classPrivateFieldGetHelper);
                let args;
                if (!f) {
                    args = [receiver, state, factory2.createStringLiteral(kind)];
                }
                else {
                    args = [receiver, state, factory2.createStringLiteral(kind), f];
                }
                return factory2.createCallExpression(getUnscopedHelperName("__classPrivateFieldGet"), 
                /*typeArguments*/
                void 0, args);
            }