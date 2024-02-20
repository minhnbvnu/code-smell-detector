function narrowTypeBySwitchOnDiscriminant(type, switchStatement, clauseStart, clauseEnd) {
                    const switchTypes = getSwitchClauseTypes(switchStatement);
                    if (!switchTypes.length) {
                        return type;
                    }
                    const clauseTypes = switchTypes.slice(clauseStart, clauseEnd);
                    const hasDefaultClause = clauseStart === clauseEnd || contains(clauseTypes, neverType);
                    if (type.flags & 2 /* Unknown */ && !hasDefaultClause) {
                        let groundClauseTypes;
                        for (let i = 0; i < clauseTypes.length; i += 1) {
                            const t = clauseTypes[i];
                            if (t.flags & (134348796 /* Primitive */ | 67108864 /* NonPrimitive */)) {
                                if (groundClauseTypes !== void 0) {
                                    groundClauseTypes.push(t);
                                }
                            }
                            else if (t.flags & 524288 /* Object */) {
                                if (groundClauseTypes === void 0) {
                                    groundClauseTypes = clauseTypes.slice(0, i);
                                }
                                groundClauseTypes.push(nonPrimitiveType);
                            }
                            else {
                                return type;
                            }
                        }
                        return getUnionType(groundClauseTypes === void 0 ? clauseTypes : groundClauseTypes);
                    }
                    const discriminantType = getUnionType(clauseTypes);
                    const caseType = discriminantType.flags & 131072 /* Never */ ? neverType : replacePrimitivesWithLiterals(filterType(type, (t) => areTypesComparable(discriminantType, t)), discriminantType);
                    if (!hasDefaultClause) {
                        return caseType;
                    }
                    const defaultType = filterType(type, (t) => !(isUnitLikeType(t) && contains(switchTypes, getRegularTypeOfLiteralType(extractUnitType(t)))));
                    return caseType.flags & 131072 /* Never */ ? defaultType : getUnionType([caseType, defaultType]);
                }