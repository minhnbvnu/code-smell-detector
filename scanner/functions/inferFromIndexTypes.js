function inferFromIndexTypes(source, target) {
                    const priority2 = getObjectFlags(source) & getObjectFlags(target) & 32 /* Mapped */ ? 8 /* HomomorphicMappedType */ : 0;
                    const indexInfos = getIndexInfosOfType(target);
                    if (isObjectTypeWithInferableIndex(source)) {
                        for (const targetInfo of indexInfos) {
                            const propTypes = [];
                            for (const prop of getPropertiesOfType(source)) {
                                if (isApplicableIndexType(getLiteralTypeFromProperty(prop, 8576 /* StringOrNumberLiteralOrUnique */), targetInfo.keyType)) {
                                    const propType = getTypeOfSymbol(prop);
                                    propTypes.push(prop.flags & 16777216 /* Optional */ ? removeMissingOrUndefinedType(propType) : propType);
                                }
                            }
                            for (const info of getIndexInfosOfType(source)) {
                                if (isApplicableIndexType(info.keyType, targetInfo.keyType)) {
                                    propTypes.push(info.type);
                                }
                            }
                            if (propTypes.length) {
                                inferWithPriority(getUnionType(propTypes), targetInfo.type, priority2);
                            }
                        }
                    }
                    for (const targetInfo of indexInfos) {
                        const sourceInfo = getApplicableIndexInfo(source, targetInfo.keyType);
                        if (sourceInfo) {
                            inferWithPriority(sourceInfo.type, targetInfo.type, priority2);
                        }
                    }
                }