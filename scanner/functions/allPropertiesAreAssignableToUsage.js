function allPropertiesAreAssignableToUsage(type, usage) {
                if (!usage.properties)
                    return false;
                return !forEachEntry(usage.properties, (propUsage, name) => {
                    const source = checker.getTypeOfPropertyOfType(type, name);
                    if (!source) {
                        return true;
                    }
                    if (propUsage.calls) {
                        const sigs = checker.getSignaturesOfType(source, 0 /* Call */);
                        return !sigs.length || !checker.isTypeAssignableTo(source, getFunctionFromCalls(propUsage.calls));
                    }
                    else {
                        return !checker.isTypeAssignableTo(source, combineFromUsage(propUsage));
                    }
                });
            }