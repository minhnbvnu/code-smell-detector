function getAdjustedTypeWithFacts(type, facts) {
                const reduced = recombineUnknownType(getTypeWithFacts(strictNullChecks && type.flags & 2 /* Unknown */ ? unknownUnionType : type, facts));
                if (strictNullChecks) {
                    switch (facts) {
                        case 524288 /* NEUndefined */:
                            return mapType(reduced, (t) => getTypeFacts(t) & 65536 /* EQUndefined */ ? getIntersectionType([t, getTypeFacts(t) & 131072 /* EQNull */ && !maybeTypeOfKind(reduced, 65536 /* Null */) ? getUnionType([emptyObjectType, nullType]) : emptyObjectType]) : t);
                        case 1048576 /* NENull */:
                            return mapType(reduced, (t) => getTypeFacts(t) & 131072 /* EQNull */ ? getIntersectionType([t, getTypeFacts(t) & 65536 /* EQUndefined */ && !maybeTypeOfKind(reduced, 32768 /* Undefined */) ? getUnionType([emptyObjectType, undefinedType]) : emptyObjectType]) : t);
                        case 2097152 /* NEUndefinedOrNull */:
                        case 4194304 /* Truthy */:
                            return mapType(reduced, (t) => getTypeFacts(t) & 262144 /* EQUndefinedOrNull */ ? getGlobalNonNullableTypeInstantiation(t) : t);
                    }
                }
                return reduced;
            }