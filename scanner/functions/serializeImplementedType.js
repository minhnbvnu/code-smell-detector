function serializeImplementedType(t) {
                        const ref = trySerializeAsTypeReference(t, 788968 /* Type */);
                        if (ref) {
                            return ref;
                        }
                        if (t.symbol) {
                            return factory.createExpressionWithTypeArguments(symbolToExpression(t.symbol, context, 788968 /* Type */), 
                            /*typeArgs*/
                            void 0);
                        }
                    }