function typeRelatedToEachType(source2, target2, reportErrors2, intersectionState) {
                    let result2 = -1 /* True */;
                    const targetTypes = target2.types;
                    for (const targetType of targetTypes) {
                        const related = isRelatedTo(source2, targetType, 2 /* Target */, reportErrors2, 
                        /*headMessage*/
                        void 0, intersectionState);
                        if (!related) {
                            return 0 /* False */;
                        }
                        result2 &= related;
                    }
                    return result2;
                }