function getIntersectionType(types, aliasSymbol, aliasTypeArguments, noSupertypeReduction) {
                const typeMembershipMap = /* @__PURE__ */ new Map();
                const includes = addTypesToIntersection(typeMembershipMap, 0, types);
                const typeSet = arrayFrom(typeMembershipMap.values());
                if (includes & 131072 /* Never */) {
                    return contains(typeSet, silentNeverType) ? silentNeverType : neverType;
                }
                if (strictNullChecks && includes & 98304 /* Nullable */ && includes & (524288 /* Object */ | 67108864 /* NonPrimitive */ | 16777216 /* IncludesEmptyObject */) || includes & 67108864 /* NonPrimitive */ && includes & (469892092 /* DisjointDomains */ & ~67108864 /* NonPrimitive */) || includes & 402653316 /* StringLike */ && includes & (469892092 /* DisjointDomains */ & ~402653316 /* StringLike */) || includes & 296 /* NumberLike */ && includes & (469892092 /* DisjointDomains */ & ~296 /* NumberLike */) || includes & 2112 /* BigIntLike */ && includes & (469892092 /* DisjointDomains */ & ~2112 /* BigIntLike */) || includes & 12288 /* ESSymbolLike */ && includes & (469892092 /* DisjointDomains */ & ~12288 /* ESSymbolLike */) || includes & 49152 /* VoidLike */ && includes & (469892092 /* DisjointDomains */ & ~49152 /* VoidLike */)) {
                    return neverType;
                }
                if (includes & 134217728 /* TemplateLiteral */ && includes & 128 /* StringLiteral */ && extractRedundantTemplateLiterals(typeSet)) {
                    return neverType;
                }
                if (includes & 1 /* Any */) {
                    return includes & 8388608 /* IncludesWildcard */ ? wildcardType : anyType;
                }
                if (!strictNullChecks && includes & 98304 /* Nullable */) {
                    return includes & 16777216 /* IncludesEmptyObject */ ? neverType : includes & 32768 /* Undefined */ ? undefinedType : nullType;
                }
                if (includes & 4 /* String */ && includes & (128 /* StringLiteral */ | 134217728 /* TemplateLiteral */ | 268435456 /* StringMapping */) || includes & 8 /* Number */ && includes & 256 /* NumberLiteral */ || includes & 64 /* BigInt */ && includes & 2048 /* BigIntLiteral */ || includes & 4096 /* ESSymbol */ && includes & 8192 /* UniqueESSymbol */ || includes & 16384 /* Void */ && includes & 32768 /* Undefined */ || includes & 16777216 /* IncludesEmptyObject */ && includes & 470302716 /* DefinitelyNonNullable */) {
                    if (!noSupertypeReduction)
                        removeRedundantSupertypes(typeSet, includes);
                }
                if (includes & 262144 /* IncludesMissingType */) {
                    typeSet[typeSet.indexOf(undefinedType)] = missingType;
                }
                if (typeSet.length === 0) {
                    return unknownType;
                }
                if (typeSet.length === 1) {
                    return typeSet[0];
                }
                const id = getTypeListId(typeSet) + getAliasId(aliasSymbol, aliasTypeArguments);
                let result = intersectionTypes.get(id);
                if (!result) {
                    if (includes & 1048576 /* Union */) {
                        if (intersectUnionsOfPrimitiveTypes(typeSet)) {
                            result = getIntersectionType(typeSet, aliasSymbol, aliasTypeArguments);
                        }
                        else if (eachIsUnionContaining(typeSet, 32768 /* Undefined */)) {
                            const containedUndefinedType = some(typeSet, containsMissingType) ? missingType : undefinedType;
                            removeFromEach(typeSet, 32768 /* Undefined */);
                            result = getUnionType([getIntersectionType(typeSet), containedUndefinedType], 1 /* Literal */, aliasSymbol, aliasTypeArguments);
                        }
                        else if (eachIsUnionContaining(typeSet, 65536 /* Null */)) {
                            removeFromEach(typeSet, 65536 /* Null */);
                            result = getUnionType([getIntersectionType(typeSet), nullType], 1 /* Literal */, aliasSymbol, aliasTypeArguments);
                        }
                        else {
                            if (!checkCrossProductUnion(typeSet)) {
                                return errorType;
                            }
                            const constituents = getCrossProductIntersections(typeSet);
                            const origin = some(constituents, (t) => !!(t.flags & 2097152 /* Intersection */)) && getConstituentCountOfTypes(constituents) > getConstituentCountOfTypes(typeSet) ? createOriginUnionOrIntersectionType(2097152 /* Intersection */, typeSet) : void 0;
                            result = getUnionType(constituents, 1 /* Literal */, aliasSymbol, aliasTypeArguments, origin);
                        }
                    }
                    else {
                        result = createIntersectionType(typeSet, aliasSymbol, aliasTypeArguments);
                    }
                    intersectionTypes.set(id, result);
                }
                return result;
            }