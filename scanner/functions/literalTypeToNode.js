function literalTypeToNode(type, enclosing, tracker) {
                const enumResult = type.flags & 1056 /* EnumLike */ ? nodeBuilder.symbolToExpression(type.symbol, 111551 /* Value */, enclosing, 
                /*flags*/
                void 0, tracker) : type === trueType ? factory.createTrue() : type === falseType && factory.createFalse();
                if (enumResult)
                    return enumResult;
                const literalValue = type.value;
                return typeof literalValue === "object" ? factory.createBigIntLiteral(literalValue) : typeof literalValue === "number" ? factory.createNumericLiteral(literalValue) : factory.createStringLiteral(literalValue);
            }