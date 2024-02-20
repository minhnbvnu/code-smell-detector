function eachTypeRelatedToType(source2, target2, reportErrors2, intersectionState) {
                    let result2 = -1 /* True */;
                    const sourceTypes = source2.types;
                    const undefinedStrippedTarget = getUndefinedStrippedTargetIfNeeded(source2, target2);
                    for (let i = 0; i < sourceTypes.length; i++) {
                        const sourceType = sourceTypes[i];
                        if (undefinedStrippedTarget.flags & 1048576 /* Union */ && sourceTypes.length >= undefinedStrippedTarget.types.length && sourceTypes.length % undefinedStrippedTarget.types.length === 0) {
                            const related2 = isRelatedTo(sourceType, undefinedStrippedTarget.types[i % undefinedStrippedTarget.types.length], 3 /* Both */, 
                            /*reportErrors*/
                            false, 
                            /*headMessage*/
                            void 0, intersectionState);
                            if (related2) {
                                result2 &= related2;
                                continue;
                            }
                        }
                        const related = isRelatedTo(sourceType, target2, 1 /* Source */, reportErrors2, 
                        /*headMessage*/
                        void 0, intersectionState);
                        if (!related) {
                            return 0 /* False */;
                        }
                        result2 &= related;
                    }
                    return result2;
                }