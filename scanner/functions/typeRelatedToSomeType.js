function typeRelatedToSomeType(source2, target2, reportErrors2) {
                    const targetTypes = target2.types;
                    if (target2.flags & 1048576 /* Union */) {
                        if (containsType(targetTypes, source2)) {
                            return -1 /* True */;
                        }
                        const match = getMatchingUnionConstituentForType(target2, source2);
                        if (match) {
                            const related = isRelatedTo(source2, match, 2 /* Target */, 
                            /*reportErrors*/
                            false);
                            if (related) {
                                return related;
                            }
                        }
                    }
                    for (const type of targetTypes) {
                        const related = isRelatedTo(source2, type, 2 /* Target */, 
                        /*reportErrors*/
                        false);
                        if (related) {
                            return related;
                        }
                    }
                    if (reportErrors2) {
                        const bestMatchingType = getBestMatchingType(source2, target2, isRelatedTo);
                        if (bestMatchingType) {
                            isRelatedTo(source2, bestMatchingType, 2 /* Target */, 
                            /*reportErrors*/
                            true);
                        }
                    }
                    return 0 /* False */;
                }