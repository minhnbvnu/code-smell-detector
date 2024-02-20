function getEffectiveConstraintOfIntersection(types, targetIsUnion) {
                let constraints;
                let hasDisjointDomainType = false;
                for (const t of types) {
                    if (t.flags & 465829888 /* Instantiable */) {
                        let constraint = getConstraintOfType(t);
                        while (constraint && constraint.flags & (262144 /* TypeParameter */ | 4194304 /* Index */ | 16777216 /* Conditional */)) {
                            constraint = getConstraintOfType(constraint);
                        }
                        if (constraint) {
                            constraints = append(constraints, constraint);
                            if (targetIsUnion) {
                                constraints = append(constraints, t);
                            }
                        }
                    }
                    else if (t.flags & 469892092 /* DisjointDomains */ || isEmptyAnonymousObjectType(t)) {
                        hasDisjointDomainType = true;
                    }
                }
                if (constraints && (targetIsUnion || hasDisjointDomainType)) {
                    if (hasDisjointDomainType) {
                        for (const t of types) {
                            if (t.flags & 469892092 /* DisjointDomains */ || isEmptyAnonymousObjectType(t)) {
                                constraints = append(constraints, t);
                            }
                        }
                    }
                    return getNormalizedType(getIntersectionType(constraints), 
                    /*writing*/
                    false);
                }
                return void 0;
            }