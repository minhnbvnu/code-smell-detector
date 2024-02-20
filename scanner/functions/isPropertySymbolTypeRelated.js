function isPropertySymbolTypeRelated(sourceProp, targetProp, getTypeOfSourceProperty, reportErrors2, intersectionState) {
                    const targetIsOptional = strictNullChecks && !!(getCheckFlags(targetProp) & 48 /* Partial */);
                    const effectiveTarget = addOptionality(getNonMissingTypeOfSymbol(targetProp), 
                    /*isProperty*/
                    false, targetIsOptional);
                    const effectiveSource = getTypeOfSourceProperty(sourceProp);
                    return isRelatedTo(effectiveSource, effectiveTarget, 3 /* Both */, reportErrors2, 
                    /*headMessage*/
                    void 0, intersectionState);
                }