function trySerializeAsTypeReference(t, flags) {
                        let typeArgs;
                        let reference;
                        if (t.target && isSymbolAccessibleByFlags(t.target.symbol, enclosingDeclaration, flags)) {
                            typeArgs = map(getTypeArguments(t), (t2) => typeToTypeNodeHelper(t2, context));
                            reference = symbolToExpression(t.target.symbol, context, 788968 /* Type */);
                        }
                        else if (t.symbol && isSymbolAccessibleByFlags(t.symbol, enclosingDeclaration, flags)) {
                            reference = symbolToExpression(t.symbol, context, 788968 /* Type */);
                        }
                        if (reference) {
                            return factory.createExpressionWithTypeArguments(reference, typeArgs);
                        }
                    }