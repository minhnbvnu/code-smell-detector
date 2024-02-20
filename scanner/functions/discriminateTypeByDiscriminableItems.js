function discriminateTypeByDiscriminableItems(target, discriminators, related, defaultValue, skipPartial) {
                const discriminable = target.types.map((_) => void 0);
                for (const [getDiscriminatingType, propertyName] of discriminators) {
                    const targetProp = getUnionOrIntersectionProperty(target, propertyName);
                    if (skipPartial && targetProp && getCheckFlags(targetProp) & 16 /* ReadPartial */) {
                        continue;
                    }
                    let i = 0;
                    for (const type of target.types) {
                        const targetType = getTypeOfPropertyOfType(type, propertyName);
                        if (targetType && related(getDiscriminatingType(), targetType)) {
                            discriminable[i] = discriminable[i] === void 0 ? true : discriminable[i];
                        }
                        else {
                            discriminable[i] = false;
                        }
                        i++;
                    }
                }
                const match = discriminable.indexOf(
                /*searchElement*/
                true);
                if (match === -1) {
                    return defaultValue;
                }
                let nextMatch = discriminable.indexOf(
                /*searchElement*/
                true, match + 1);
                while (nextMatch !== -1) {
                    if (!isTypeIdenticalTo(target.types[match], target.types[nextMatch])) {
                        return defaultValue;
                    }
                    nextMatch = discriminable.indexOf(
                    /*searchElement*/
                    true, nextMatch + 1);
                }
                return target.types[match];
            }