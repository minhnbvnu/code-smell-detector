function unionOrIntersectionRelatedTo(source2, target2, reportErrors2, intersectionState) {
                    if (source2.flags & 1048576 /* Union */) {
                        return relation === comparableRelation ? someTypeRelatedToType(source2, target2, reportErrors2 && !(source2.flags & 134348796 /* Primitive */), intersectionState) : eachTypeRelatedToType(source2, target2, reportErrors2 && !(source2.flags & 134348796 /* Primitive */), intersectionState);
                    }
                    if (target2.flags & 1048576 /* Union */) {
                        return typeRelatedToSomeType(getRegularTypeOfObjectLiteral(source2), target2, reportErrors2 && !(source2.flags & 134348796 /* Primitive */) && !(target2.flags & 134348796 /* Primitive */));
                    }
                    if (target2.flags & 2097152 /* Intersection */) {
                        return typeRelatedToEachType(source2, target2, reportErrors2, 2 /* Target */);
                    }
                    if (relation === comparableRelation && target2.flags & 134348796 /* Primitive */) {
                        const constraints = sameMap(source2.types, (t) => t.flags & 465829888 /* Instantiable */ ? getBaseConstraintOfType(t) || unknownType : t);
                        if (constraints !== source2.types) {
                            source2 = getIntersectionType(constraints);
                            if (source2.flags & 131072 /* Never */) {
                                return 0 /* False */;
                            }
                            if (!(source2.flags & 2097152 /* Intersection */)) {
                                return isRelatedTo(source2, target2, 1 /* Source */, 
                                /*reportErrors*/
                                false) || isRelatedTo(target2, source2, 1 /* Source */, 
                                /*reportErrors*/
                                false);
                            }
                        }
                    }
                    return someTypeRelatedToType(source2, target2, 
                    /*reportErrors*/
                    false, 1 /* Source */);
                }