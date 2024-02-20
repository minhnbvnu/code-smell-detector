function isTypeInvalidDueToUnionDiscriminant(contextualType, obj) {
                const list = obj.properties;
                return list.some((property) => {
                    const nameType = property.name && getLiteralTypeFromPropertyName(property.name);
                    const name = nameType && isTypeUsableAsPropertyName(nameType) ? getPropertyNameFromType(nameType) : void 0;
                    const expected = name === void 0 ? void 0 : getTypeOfPropertyOfType(contextualType, name);
                    return !!expected && isLiteralType(expected) && !isTypeAssignableTo(getTypeOfNode(property), expected);
                });
            }