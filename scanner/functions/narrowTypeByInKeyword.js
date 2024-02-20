function narrowTypeByInKeyword(type, nameType, assumeTrue) {
                    const name = getPropertyNameFromType(nameType);
                    const isKnownProperty2 = someType(type, (t) => isTypePresencePossible(t, name, 
                    /*assumeTrue*/
                    true));
                    if (isKnownProperty2) {
                        return filterType(type, (t) => isTypePresencePossible(t, name, assumeTrue));
                    }
                    if (assumeTrue) {
                        const recordSymbol = getGlobalRecordSymbol();
                        if (recordSymbol) {
                            return getIntersectionType([type, getTypeAliasInstantiation(recordSymbol, [nameType, unknownType])]);
                        }
                    }
                    return type;
                }