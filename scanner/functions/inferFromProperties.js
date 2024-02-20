function inferFromProperties(source, target) {
                    const properties = getPropertiesOfObjectType(target);
                    for (const targetProp of properties) {
                        const sourceProp = getPropertyOfType(source, targetProp.escapedName);
                        if (sourceProp && !some(sourceProp.declarations, hasSkipDirectInferenceFlag)) {
                            inferFromTypes(getTypeOfSymbol(sourceProp), getTypeOfSymbol(targetProp));
                        }
                    }
                }