function getBooleanComparison(node) {
                const comparison = deconstructComparison(node);
                if (!comparison) {
                    return undefined;
                }
                const expressionType = checker.getTypeAtLocation(parserServices.esTreeNodeToTSNodeMap.get(comparison.expression));
                if (isBooleanType(expressionType)) {
                    return Object.assign(Object.assign({}, comparison), { expressionIsNullableBoolean: false });
                }
                if (isNullableBoolean(expressionType)) {
                    return Object.assign(Object.assign({}, comparison), { expressionIsNullableBoolean: true });
                }
                return undefined;
            }