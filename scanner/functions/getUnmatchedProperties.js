function* getUnmatchedProperties(source, target, requireOptionalProperties, matchDiscriminantProperties) {
                const properties = getPropertiesOfType(target);
                for (const targetProp of properties) {
                    if (isStaticPrivateIdentifierProperty(targetProp)) {
                        continue;
                    }
                    if (requireOptionalProperties || !(targetProp.flags & 16777216 /* Optional */ || getCheckFlags(targetProp) & 48 /* Partial */)) {
                        const sourceProp = getPropertyOfType(source, targetProp.escapedName);
                        if (!sourceProp) {
                            yield targetProp;
                        }
                        else if (matchDiscriminantProperties) {
                            const targetType = getTypeOfSymbol(targetProp);
                            if (targetType.flags & 109472 /* Unit */) {
                                const sourceType = getTypeOfSymbol(sourceProp);
                                if (!(sourceType.flags & 1 /* Any */ || getRegularTypeOfLiteralType(sourceType) === getRegularTypeOfLiteralType(targetType))) {
                                    yield targetProp;
                                }
                            }
                        }
                    }
                }
            }