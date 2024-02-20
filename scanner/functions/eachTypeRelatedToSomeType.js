function eachTypeRelatedToSomeType(source2, target2) {
                    let result2 = -1 /* True */;
                    const sourceTypes = source2.types;
                    for (const sourceType of sourceTypes) {
                        const related = typeRelatedToSomeType(sourceType, target2, 
                        /*reportErrors*/
                        false);
                        if (!related) {
                            return 0 /* False */;
                        }
                        result2 &= related;
                    }
                    return result2;
                }