function getUnionOrIntersectionTypePredicate(signatures, kind) {
                let first2;
                const types = [];
                for (const sig of signatures) {
                    const pred = getTypePredicateOfSignature(sig);
                    if (!pred || pred.kind === 2 /* AssertsThis */ || pred.kind === 3 /* AssertsIdentifier */) {
                        if (kind !== 2097152 /* Intersection */) {
                            continue;
                        }
                        else {
                            return;
                        }
                    }
                    if (first2) {
                        if (!typePredicateKindsMatch(first2, pred)) {
                            return void 0;
                        }
                    }
                    else {
                        first2 = pred;
                    }
                    types.push(pred.type);
                }
                if (!first2) {
                    return void 0;
                }
                const compositeType = getUnionOrIntersectionType(types, kind);
                return createTypePredicate(first2.kind, first2.parameterName, first2.parameterIndex, compositeType);
            }