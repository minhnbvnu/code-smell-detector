function createSyntheticExpression(parent2, type, isSpread, tupleNameSource) {
                const result = parseNodeFactory.createSyntheticExpression(type, isSpread, tupleNameSource);
                setTextRange(result, parent2);
                setParent(result, parent2);
                return result;
            }