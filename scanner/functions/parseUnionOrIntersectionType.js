function parseUnionOrIntersectionType(operator, parseConstituentType, createTypeNode) {
                        const pos = getNodePos();
                        const isUnionType = operator === 51 /* BarToken */;
                        const hasLeadingOperator = parseOptional(operator);
                        let type = hasLeadingOperator && parseFunctionOrConstructorTypeToError(isUnionType) || parseConstituentType();
                        if (token() === operator || hasLeadingOperator) {
                            const types = [type];
                            while (parseOptional(operator)) {
                                types.push(parseFunctionOrConstructorTypeToError(isUnionType) || parseConstituentType());
                            }
                            type = finishNode(createTypeNode(createNodeArray(types, pos)), pos);
                        }
                        return type;
                    }