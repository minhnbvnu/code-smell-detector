function propertiesIdenticalTo(source2, target2, excludedProperties) {
                    if (!(source2.flags & 524288 /* Object */ && target2.flags & 524288 /* Object */)) {
                        return 0 /* False */;
                    }
                    const sourceProperties = excludeProperties(getPropertiesOfObjectType(source2), excludedProperties);
                    const targetProperties = excludeProperties(getPropertiesOfObjectType(target2), excludedProperties);
                    if (sourceProperties.length !== targetProperties.length) {
                        return 0 /* False */;
                    }
                    let result2 = -1 /* True */;
                    for (const sourceProp of sourceProperties) {
                        const targetProp = getPropertyOfObjectType(target2, sourceProp.escapedName);
                        if (!targetProp) {
                            return 0 /* False */;
                        }
                        const related = compareProperties2(sourceProp, targetProp, isRelatedTo);
                        if (!related) {
                            return 0 /* False */;
                        }
                        result2 &= related;
                    }
                    return result2;
                }