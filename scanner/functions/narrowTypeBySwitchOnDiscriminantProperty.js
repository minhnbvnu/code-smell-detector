function narrowTypeBySwitchOnDiscriminantProperty(type, access, switchStatement, clauseStart, clauseEnd) {
                    if (clauseStart < clauseEnd && type.flags & 1048576 /* Union */ && getKeyPropertyName(type) === getAccessedPropertyName(access)) {
                        const clauseTypes = getSwitchClauseTypes(switchStatement).slice(clauseStart, clauseEnd);
                        const candidate = getUnionType(map(clauseTypes, (t) => getConstituentTypeForKeyType(type, t) || unknownType));
                        if (candidate !== unknownType) {
                            return candidate;
                        }
                    }
                    return narrowTypeByDiscriminant(type, access, (t) => narrowTypeBySwitchOnDiscriminant(t, switchStatement, clauseStart, clauseEnd));
                }