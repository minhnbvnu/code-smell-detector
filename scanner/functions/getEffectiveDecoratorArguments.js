function getEffectiveDecoratorArguments(node) {
                const expr = node.expression;
                const signature = getDecoratorCallSignature(node);
                if (signature) {
                    const args = [];
                    for (const param of signature.parameters) {
                        const type = getTypeOfSymbol(param);
                        args.push(createSyntheticExpression(expr, type));
                    }
                    return args;
                }
                return Debug.fail();
            }