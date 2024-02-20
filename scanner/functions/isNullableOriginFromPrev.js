function isNullableOriginFromPrev(node) {
                const prevType = getNodeType(node.object);
                const property = node.property;
                if (prevType.isUnion() && (0, util_1.isIdentifier)(property)) {
                    const isOwnNullable = prevType.types.some(type => {
                        if (node.computed) {
                            const propertyType = getNodeType(node.property);
                            return isNullablePropertyType(type, propertyType);
                        }
                        const propType = (0, util_1.getTypeOfPropertyOfName)(checker, type, property.name);
                        if (propType) {
                            return (0, util_1.isNullableType)(propType, { allowUndefined: true });
                        }
                        return !!checker.getIndexInfoOfType(type, ts.IndexKind.String);
                    });
                    return (!isOwnNullable && (0, util_1.isNullableType)(prevType, { allowUndefined: true }));
                }
                return false;
            }