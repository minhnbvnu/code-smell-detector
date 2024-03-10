function getUnionType(types, unionReduction = 1 /* Literal */, aliasSymbol, aliasTypeArguments, origin) {
                if (types.length === 0) {
                    return neverType;
                }
                if (types.length === 1) {
                    return types[0];
                }
                let typeSet = [];
                const includes = addTypesToUnion(typeSet, 0, types);
                if (unionReduction !== 0 /* None */) {
                    if (includes & 3 /* AnyOrUnknown */) {
                        return includes & 1 /* Any */ ? includes & 8388608 /* IncludesWildcard */ ? wildcardType : anyType : includes & 65536 /* Null */ || containsType(typeSet, unknownType) ? unknownType : nonNullUnknownType;
                    }
                    if (includes & 32768 /* Undefined */) {
                        if (typeSet.length >= 2 && typeSet[0] === undefinedType && typeSet[1] === missingType) {
                            orderedRemoveItemAt(typeSet, 1);
                        }
                    }
                    if (includes & (32 /* Enum */ | 2944 /* Literal */ | 8192 /* UniqueESSymbol */ | 134217728 /* TemplateLiteral */ | 268435456 /* StringMapping */) || includes & 16384 /* Void */ && includes & 32768 /* Undefined */) {
                        removeRedundantLiteralTypes(typeSet, includes, !!(unionReduction & 2 /* Subtype */));
                    }
                    if (includes & 128 /* StringLiteral */ && includes & 134217728 /* TemplateLiteral */) {
                        removeStringLiteralsMatchedByTemplateLiterals(typeSet);
                    }
                    if (unionReduction === 2 /* Subtype */) {
                        typeSet = removeSubtypes(typeSet, !!(includes & 524288 /* Object */));
                        if (!typeSet) {
                            return errorType;
                        }
                    }
                    if (typeSet.length === 0) {
                        return includes & 65536 /* Null */ ? includes & 4194304 /* IncludesNonWideningType */ ? nullType : nullWideningType : includes & 32768 /* Undefined */ ? includes & 4194304 /* IncludesNonWideningType */ ? undefinedType : undefinedWideningType : neverType;
                    }
                }
                if (!origin && includes & 1048576 /* Union */) {
                    const namedUnions = [];
                    addNamedUnions(namedUnions, types);
                    const reducedTypes = [];
                    for (const t of typeSet) {
                        if (!some(namedUnions, (union) => containsType(union.types, t))) {
                            reducedTypes.push(t);
                        }
                    }
                    if (!aliasSymbol && namedUnions.length === 1 && reducedTypes.length === 0) {
                        return namedUnions[0];
                    }
                    const namedTypesCount = reduceLeft(namedUnions, (sum, union) => sum + union.types.length, 0);
                    if (namedTypesCount + reducedTypes.length === typeSet.length) {
                        for (const t of namedUnions) {
                            insertType(reducedTypes, t);
                        }
                        origin = createOriginUnionOrIntersectionType(1048576 /* Union */, reducedTypes);
                    }
                }
                const objectFlags = (includes & 36323363 /* NotPrimitiveUnion */ ? 0 : 32768 /* PrimitiveUnion */) | (includes & 2097152 /* Intersection */ ? 16777216 /* ContainsIntersections */ : 0);
                return getUnionTypeFromSortedList(typeSet, objectFlags, aliasSymbol, aliasTypeArguments, origin);
            }